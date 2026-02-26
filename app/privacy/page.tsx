import Link from "next/link";
import FooterSection from "@/components/homepage/footer";

export const metadata = {
  title: "Privacy Policy for Chouz",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="min-h-screen bg-white px-6 py-16 text-sm text-zinc-800">
        <div className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-3">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
              <Link
                href="/"
                className="text-xs font-medium text-gray-600 underline-offset-4 hover:underline"
              >
                Back to landing
              </Link>
              <h1 className="text-2xl font-serif font-medium">Privacy Policy for Chouz</h1>
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
              Effective date: February 26, 2026
            </p>
            <p>
              Chouz (&quot;Chouz,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides a
              mobile meditation and reflection app. This Privacy Policy explains how we
              collect, use, disclose, and protect information when you use the Chouz app
              and related services.
            </p>
            <p>By using Chouz, you agree to this Privacy Policy.</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-serif">1. Scope</h2>
            <p>This Privacy Policy applies to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>The Chouz mobile app</li>
              <li>Account creation and sign-in</li>
              <li>Meditation sessions, reflections, and journal features</li>
              <li>Customer support communications related to the app</li>
            </ul>
            <p>
              It does not govern third-party services that have their own privacy policies
              (for example, Google Play billing services).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif">2. Information We Collect</h2>
            <p>
              We collect only the information needed to operate Chouz and provide the app
              experience.
            </p>

            <div className="space-y-3">
              <h3 className="text-base font-medium">A. Information You Provide</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>Email address (for account creation, sign-in, and account support)</li>
                <li>Name (if you choose to provide it)</li>
                <li>Journal entries / reflections that you enter in the app</li>
                <li>
                  Reminder settings and app preferences (such as reminder time)
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-medium">B. Information Related to App Use</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  Meditation session activity, such as session completion and
                  progress/history
                </li>
                <li>
                  Feature usage data needed to provide app functionality (for example,
                  whether a reflection was saved)
                </li>
                <li>Subscription / entitlement status (for trial and premium access)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-medium">C. Billing and Purchase Information</h3>
              <p>
                If you subscribe through Google Play, billing is processed by Google. We do
                not store your full payment card details.
              </p>
              <p>
                We may store limited subscription-related metadata needed to manage access
                and support billing integrity, such as:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Subscription status</li>
                <li>Product identifier</li>
                <li>Expiration/renewal status</li>
                <li>Limited purchase reference information (where applicable)</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Create and manage your account</li>
              <li>Authenticate your sign-in</li>
              <li>Deliver meditation content and app features</li>
              <li>Save your journal entries and reflections</li>
              <li>Save and apply your reminder and app settings</li>
              <li>Provide trial and subscription access</li>
              <li>Provide customer support</li>
              <li>Maintain app security and prevent abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>We do not sell your personal information.</p>
            <p>
              We do not use your personal information for third-party behavioral
              advertising.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif">4. How We Share Information</h2>
            <p>
              We may share information only as necessary to operate Chouz, including with:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Service providers / infrastructure providers (such as hosting, storage,
                and backend services)
              </li>
              <li>
                Google Play / Google for subscription billing and purchase processing
              </li>
              <li>
                Legal authorities if required by law, regulation, or valid legal process
              </li>
              <li>
                Professional advisors (for legal, security, or compliance purposes) when
                necessary
              </li>
            </ul>
            <p>We do not share your journal reflections for advertising purposes.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif">5. Data Retention</h2>
            <p>We retain personal data only as long as necessary to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Provide the app and its features</li>
              <li>Maintain account access and subscription functionality</li>
              <li>Provide support</li>
              <li>
                Meet legal, billing, fraud prevention, security, and compliance
                obligations
              </li>
            </ul>
            <p>
              When you delete your account, we delete or anonymize personal app data as
              described in Section 8 (&quot;Account Deletion&quot;).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif">6. Data Security</h2>
            <p>
              We use reasonable administrative, technical, and organizational measures to
              protect your information.
            </p>
            <p>
              No method of transmission or storage is 100% secure, and we cannot
              guarantee absolute security. However, we work to protect your data and limit
              access to what is necessary.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif">7. Children&apos;s Privacy</h2>
            <p>
              Chouz is not directed to children and is not intended for use by children
              under the age required by applicable law in your region (for example, under
              13 in some jurisdictions).
            </p>
            <p>
              If you believe a child has provided personal information to Chouz, contact
              us at hello@chouz.app and we will take appropriate steps.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-serif">8. Account Deletion</h2>
            <p>You can delete your Chouz account in the app by going to:</p>
            <p className="font-medium">Settings &gt; Delete Account</p>
            <p>
              When you request account deletion, we delete or anonymize your personal app
              data, including:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Profile information</li>
              <li>Journal entries and reflections</li>
              <li>App settings (including reminder preferences)</li>
              <li>Meditation session history used in Chouz</li>
            </ul>
            <p>
              After deletion, your account can no longer be used to access the app.
            </p>

            <div className="space-y-2">
              <h3 className="text-base font-medium">
                Important: Subscription Cancellation Is Separate
              </h3>
              <p>
                Deleting your Chouz account does not cancel a subscription purchased
                through Google Play. Subscription cancellation must be managed in Google
                Play.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-medium">Web Deletion Information</h3>
              <p>You can also view account deletion information at:</p>
              <p>
                <a
                  href="https://chouz.app/account-deletion"
                  className="underline underline-offset-4"
                >
                  https://chouz.app/account-deletion
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif">9. Your Rights and Choices</h2>
            <p>Depending on where you live, you may have rights to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Request a copy of your data (where applicable)</li>
              <li>Lodge a complaint with a relevant privacy regulator</li>
            </ul>
            <p>To make a request, contact us at hello@chouz.app.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif">10. International Data Transfers</h2>
            <p>
              Your information may be processed in countries other than your own,
              depending on where our service providers and infrastructure operate.
            </p>
            <p>
              Where required, we take appropriate steps to protect personal data in
              accordance with applicable law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif">11. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time.</p>
            <p>
              If we make material changes, we will update the Effective date above and,
              where appropriate, provide notice in the app or through other reasonable
              means.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif">12. Contact Us</h2>
            <p>
              If you have questions, privacy requests, or need account deletion support,
              contact:
            </p>
            <p className="font-medium">hello@chouz.app</p>
          </section>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
