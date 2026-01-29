import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";

// Minimal test config
export const authTest = betterAuth({
  database: {
    provider: "pg",
    url: process.env.DATABASE_URL!,
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        console.log("📧 Would send magic link to:", email);
        console.log("🔗 URL:", url);
        // Don't actually send, just log
      },
    }),
  ],
});

// Log what routes are available
console.log("🧪 Test auth routes:", Object.keys((authTest as { api?: Record<string, unknown> }).api || {}));
