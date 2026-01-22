import Link from "next/link";
import FooterSection from "@/components/homepage/footer";

export const metadata = {
  title: "Chouz – Privacy Policy & Terms of Use",
};

export default function PrivacyTermsPage() {
  return (
    <>
      <main className="min-h-screen bg-background-light px-6 py-16 text-sm text-muted-light dark:bg-background-dark dark:text-muted-dark">
        <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-serif font-medium">Privacy Policy &amp; Terms of Use</h1>
            <Link
              href="/"
              className="text-xs font-medium text-muted-light underline-offset-4 hover:underline dark:text-muted-dark"
            >
              ← Back to landing
            </Link>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
            Effective date: January 22, 2026
          </p>
          <p>
            Chouz is built on care, consent, and clarity. This document explains how your information is
            handled and the terms under which Chouz is offered — now and in the future.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-lg font-serif">Privacy Policy</h2>

          <div className="space-y-3">
            <h3 className="text-base font-medium">1. What information we collect</h3>
            <p>Chouz collects only the information necessary to deliver the experience.</p>
            <p className="font-medium">Information you provide</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Your email address when you sign up for Chouz</li>
              <li>Your name or billing information if you purchase a paid offering</li>
              <li>Any information you choose to share by replying to Chouz emails or completing optional forms</li>
            </ul>
            <p className="font-medium">Information collected automatically</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Basic email engagement data (such as opens or clicks)</li>
              <li>Transaction-related metadata for paid products (processed securely by third-party providers)</li>
            </ul>
            <p>
              We do <strong>not</strong> collect sensitive personal data. We do <strong>not</strong> sell or rent your
              data. We do <strong>not</strong> use your data for advertising or behavioral profiling.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">2. How your information is used</h3>
            <p>Your information is used solely to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Deliver free and paid Chouz experiences</li>
              <li>Process payments and provide access to purchased offerings</li>
              <li>Communicate with you about Chouz-related content, updates, or support</li>
              <li>Improve the experience using aggregate, non-identifying insights</li>
            </ul>
            <p>We will never use your information in a way that contradicts the purpose you signed up for.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">3. Legal basis for processing (GDPR)</h3>
            <p>For users in the European Union, we process personal data based on:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Consent</strong> — when you voluntarily provide your information
              </li>
              <li>
                <strong>Contractual necessity</strong> — when processing payments or delivering paid content
              </li>
              <li>
                <strong>Legitimate interest</strong> — to operate and improve Chouz responsibly
              </li>
            </ul>
            <p>You may withdraw consent at any time where applicable.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">4. Email communications</h3>
            <p>Chouz is primarily delivered by email.</p>
            <p>By signing up, you may receive:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>The 7-Day Morning Path</li>
              <li>Follow-up reflections or invitations related to Chouz</li>
              <li>Transactional emails for paid offerings (receipts, access, support)</li>
            </ul>
            <p>
              You can unsubscribe from non-essential emails at any time using the link provided in every message.
              Transactional emails required to deliver paid services may still be sent.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">5. Payments &amp; third-party services</h3>
            <p>
              Paid offerings are processed using trusted third-party payment providers (e.g. Stripe, Gumroad, or
              similar).
            </p>
            <p>Chouz <strong>does not store your payment details</strong>.</p>
            <p>
              Third-party providers may process data outside of Canada or the EU but are required to meet GDPR,
              PIPEDA, and applicable security standards.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">6. Data retention</h3>
            <p>We retain personal data only as long as necessary to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Deliver the service</li>
              <li>Meet legal or accounting obligations</li>
              <li>Provide support if requested</li>
            </ul>
            <p>
              You may request deletion of your data at any time, subject to legal requirements.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">7. Your rights (GDPR &amp; PIPEDA)</h3>
            <p>You have the right to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent</li>
              <li>Request data portability (where applicable)</li>
              <li>File a complaint with a relevant data protection authority</li>
            </ul>
            <p>
              To exercise these rights, contact: <strong>hello@chouz.app</strong>
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">8. Changes to this policy</h3>
            <p>
              If this policy changes, the effective date will be updated. Material changes will be communicated
              clearly and respectfully.
            </p>
          </div>
        </section>

        <section className="space-y-4 pt-4">
          <h2 className="text-lg font-serif">Terms of Use</h2>

          <div className="space-y-3">
            <h3 className="text-base font-medium">9. What Chouz is (and is not)</h3>
            <p>
              Chouz offers reflective, grounding practices designed to support how you begin your day.
            </p>
            <p>Chouz:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Is not medical advice</li>
              <li>Is not therapy</li>
              <li>Is not a substitute for professional mental health care</li>
            </ul>
            <p>Paid offerings extend the practice but do not change its nature.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">10. Personal responsibility</h3>
            <p>
              You engage with Chouz voluntarily and at your own discretion. If you are experiencing significant
              emotional distress or mental health challenges, we encourage you to seek support from a qualified
              professional.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">11. Paid offerings &amp; access</h3>
            <p>Paid offerings may include:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Digital content</li>
              <li>Email-based programs</li>
              <li>Subscriptions or time-limited access</li>
            </ul>
            <p>
              Details, pricing, and access terms will be clearly stated at the point of purchase. Unless otherwise
              specified, paid content is for <strong>personal use only</strong>.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">12. Refunds &amp; cancellations</h3>
            <p>Refund and cancellation terms will be clearly stated at the time of purchase.</p>
            <p>
              Subscriptions, if offered, can be cancelled according to the terms presented during signup.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">13. Intellectual property</h3>
            <p>
              All Chouz content — free or paid — is the intellectual property of Chouz. Content may not be
              reproduced, shared, resold, or redistributed without written permission.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">14. No guarantees</h3>
            <p>
              Chouz is offered as a reflective practice. We make no guarantees regarding outcomes, emotional shifts,
              or results.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">15. Limitation of liability</h3>
            <p>To the fullest extent permitted by law, Chouz is not liable for:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Emotional, physical, or psychological outcomes</li>
              <li>Service interruptions or changes</li>
              <li>Individual interpretations or use of the content</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">16. Termination</h3>
            <p>
              You may stop using Chouz at any time. We reserve the right to modify or discontinue offerings as the
              project evolves.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">17. Governing law</h3>
            <p>
              These terms are governed by the laws of <strong>Canada</strong>, without limiting consumer protections
              available under EU law.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-medium">18. Contact</h3>
            <p>
              For questions or concerns, contact: <strong>hello@chouz.app</strong>
            </p>
          </div>
        </section>
      </div>
      </main>
      <FooterSection />
    </>
  );
}
