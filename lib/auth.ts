import { db } from "@/db/drizzle";
import { account, session, subscription, user, verification } from "@/db/schema";
import {
  checkout,
  polar,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";

console.log('🔍 magicLink plugin imported:', typeof magicLink);

// Utility function to safely parse dates
function safeParseDate(value: string | Date | null | undefined): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  return new Date(value);
}

// const polarClient = new Polar({
//   accessToken: process.env.POLAR_ACCESS_TOKEN,
//   server: "sandbox",
// });

// const isProd = process.env.NODE_ENV === "production";
const billingEnabled = process.env.BILLING_ENABLED === "true";
// Enable Polar only when the required env vars exist
const hasPolar =
  !!process.env.POLAR_ACCESS_TOKEN &&
  !!process.env.POLAR_WEBHOOK_SECRET &&
  !!process.env.NEXT_PUBLIC_STARTER_TIER &&
  !!process.env.NEXT_PUBLIC_STARTER_SLUG;

  // if (isProd && !hasPolar) {
  // throw new Error(
  //   "Polar is not configured. Set POLAR_ACCESS_TOKEN, POLAR_WEBHOOK_SECRET, NEXT_PUBLIC_STARTER_TIER, NEXT_PUBLIC_STARTER_SLUG."
  // );

if (billingEnabled && !hasPolar) {
  throw new Error(
    "Polar is not configured. Set POLAR_ACCESS_TOKEN, POLAR_WEBHOOK_SECRET, NEXT_PUBLIC_STARTER_TIER, NEXT_PUBLIC_STARTER_SLUG."
  );
}

const polarClient = hasPolar
  ? new Polar({
      accessToken: process.env.POLAR_ACCESS_TOKEN!,
      server: "sandbox",
    })
  : null;

// Initialize Resend for magic link emails
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

if (resend) {
  console.log('✅ Resend initialized successfully');
} else {
  console.warn('⚠️ RESEND_API_KEY not found in environment variables');
}


export const auth = betterAuth({
  trustedOrigins: [`${process.env.NEXT_PUBLIC_APP_URL}`],
  allowedDevOrigins: [`${process.env.NEXT_PUBLIC_APP_URL}`],
  cookieCache: {
    enabled: true,
    maxAge: 5 * 60, // Cache duration in seconds
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
      subscription,
    },
  }),
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  // },
  socialProviders:
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {},

  plugins: [
    magicLink({
      // `token` is part of the callback signature but not used here; keep it for compatibility
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      sendMagicLink: async ({ email, token, url }) => {
        console.log("🔗 Magic link requested for:", email);
        console.log("🔗 Magic link URL:", url);
        
        if (!resend) {
          console.error("❌ Resend not configured! Please add RESEND_API_KEY to .env.local");
          throw new Error("Email service not configured");
        }
        
        try {
          const result = await resend.emails.send({
            from: process.env.EMAIL_FROM || "Chouz <onboarding@resend.dev>",
            to: email,
            subject: "Your sign-in link for Chouz",
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="font-family: 'Newsreader', Georgia, serif; background-color: #fafbf8; margin: 0; padding: 0;">
                  <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; padding: 48px; text-align: center;">
                    <div style="margin-bottom: 32px;">
                      <h1 style="font-size: 32px; font-weight: 300; color: #141b0e; margin: 0 0 16px 0;">Welcome to Chouz</h1>
                      <p style="font-size: 16px; color: #52525b; margin: 0; line-height: 1.6;">Click the link below to sign in to your morning companion.</p>
                    </div>
                    
                    <a href="${url}" style="display: inline-block; background-color: #80df20; color: #141b0e; text-decoration: none; padding: 16px 32px; border-radius: 9999px; font-weight: 500; margin: 24px 0;">Sign In to Chouz</a>
                    
                    <p style="font-size: 14px; color: #a1a1aa; margin: 32px 0 0 0;">This link expires in 5 minutes. If you didn't request this email, you can safely ignore it.</p>
                  </div>
                </body>
              </html>
            `,
          });
          
          console.log('✅ Magic link email sent successfully:', result);
          return result;
        } catch (error) {
          console.error('❌ Failed to send magic link email:', error);
          throw error;
        }
      },
      expiresIn: 60 * 5, // 5 minutes
    }),

    ...(hasPolar && polarClient
      ? [
          polar({
          client: polarClient,
          createCustomerOnSignUp: true,
          use: [
            checkout({
              products: [
                {
                  productId: process.env.NEXT_PUBLIC_STARTER_TIER!,
                  slug: process.env.NEXT_PUBLIC_STARTER_SLUG!,
                },
              ],
              successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/${process.env.POLAR_SUCCESS_URL}`,
              authenticatedUsersOnly: true,
            }),
            portal(),
            usage(),
            webhooks({
              secret: process.env.POLAR_WEBHOOK_SECRET!,
              onPayload: async ({ data, type }) => {
                // (keep your existing webhook logic unchanged)
                if (
                  type === "subscription.created" ||
                  type === "subscription.active" ||
                  type === "subscription.canceled" ||
                  type === "subscription.revoked" ||
                  type === "subscription.uncanceled" ||
                  type === "subscription.updated"
                ) {
                  console.log("🎯 Processing subscription webhook:", type);
                  console.log("📦 Payload data:", JSON.stringify(data, null, 2));

                  try {
                    const userId = data.customer?.externalId;

                    const subscriptionData = {
                      id: data.id,
                      createdAt: new Date(data.createdAt),
                      modifiedAt: safeParseDate(data.modifiedAt),
                      amount: data.amount,
                      currency: data.currency,
                      recurringInterval: data.recurringInterval,
                      status: data.status,
                      currentPeriodStart:
                        safeParseDate(data.currentPeriodStart) || new Date(),
                      currentPeriodEnd:
                        safeParseDate(data.currentPeriodEnd) || new Date(),
                      cancelAtPeriodEnd: data.cancelAtPeriodEnd || false,
                      canceledAt: safeParseDate(data.canceledAt),
                      startedAt: safeParseDate(data.startedAt) || new Date(),
                      endsAt: safeParseDate(data.endsAt),
                      endedAt: safeParseDate(data.endedAt),
                      customerId: data.customerId,
                      productId: data.productId,
                      discountId: data.discountId || null,
                      checkoutId: data.checkoutId || "",
                      customerCancellationReason:
                        data.customerCancellationReason || null,
                      customerCancellationComment:
                        data.customerCancellationComment || null,
                      metadata: data.metadata ? JSON.stringify(data.metadata) : null,
                      customFieldData: data.customFieldData
                        ? JSON.stringify(data.customFieldData)
                        : null,
                      userId: userId as string | null,
                    };

                    await db
                      .insert(subscription)
                      .values(subscriptionData)
                      .onConflictDoUpdate({
                        target: subscription.id,
                        set: {
                          modifiedAt: subscriptionData.modifiedAt || new Date(),
                          amount: subscriptionData.amount,
                          currency: subscriptionData.currency,
                          recurringInterval: subscriptionData.recurringInterval,
                          status: subscriptionData.status,
                          currentPeriodStart: subscriptionData.currentPeriodStart,
                          currentPeriodEnd: subscriptionData.currentPeriodEnd,
                          cancelAtPeriodEnd: subscriptionData.cancelAtPeriodEnd,
                          canceledAt: subscriptionData.canceledAt,
                          startedAt: subscriptionData.startedAt,
                          endsAt: subscriptionData.endsAt,
                          endedAt: subscriptionData.endedAt,
                          customerId: subscriptionData.customerId,
                          productId: subscriptionData.productId,
                          discountId: subscriptionData.discountId,
                          checkoutId: subscriptionData.checkoutId,
                          customerCancellationReason:
                            subscriptionData.customerCancellationReason,
                          customerCancellationComment:
                            subscriptionData.customerCancellationComment,
                          metadata: subscriptionData.metadata,
                          customFieldData: subscriptionData.customFieldData,
                          userId: subscriptionData.userId,
                        },
                      });
                  } catch (error) {
                    console.error("💥 Error processing subscription webhook:", error);
                  }
                }
              },
            }),
          ],
        }),
      ]
    : []),

  nextCookies(),
],
});
