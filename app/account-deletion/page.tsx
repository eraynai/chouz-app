import Link from "next/link";

export const metadata = {
  title: "Chouz Account Deletion",
  description: "How to request deletion of your Chouz account and data.",
};

export default function AccountDeletionPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-sm text-zinc-800">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
            <Link
              href="/"
              className="text-xs font-medium text-muted-light underline-offset-4 hover:underline dark:text-muted-dark"
            >
              ← Back to landing
            </Link>
          </div>
          <h1 className="text-2xl font-serif font-medium">Chouz Account Deletion</h1>
          <p className="text-xs uppercase tracking-[0.18em] text-gray-500">
            Effective date: February 26, 2026
          </p>
          <p>
            You can request deletion of your Chouz account and personal data directly in
            the app.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-serif">How to delete your account (in-app)</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Open the Chouz app.</li>
            <li>Go to Settings.</li>
            <li>Tap Delete Account.</li>
            <li>Confirm your request.</li>
            <li>Your account will be deleted and you will be signed out.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif">Important</h2>
          <p>
            Deleting your Chouz account is separate from canceling your subscription.
          </p>
          <p>
            If you subscribed through Google Play, you must cancel your subscription in
            Google Play.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif">What we delete</h2>
          <p>
            When you delete your account, Chouz deletes or anonymizes your personal app
            data, including:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Profile information</li>
            <li>Journal entries and reflections</li>
            <li>App settings and reminder preferences</li>
            <li>Meditation session history and milestones</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif">What we may retain (limited)</h2>
          <p>We may retain limited records where necessary for:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Billing and payment dispute handling</li>
            <li>Fraud prevention and security</li>
            <li>Legal compliance</li>
          </ul>
          <p>
            We do not keep your deleted account active for app use after deletion.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-serif">Need help?</h2>
          <p>
            If you cannot access the app and need help with account deletion, contact us
            at: <strong>hello@chouz.app</strong>
          </p>
        </section>
      </div>
    </main>
  );
}
