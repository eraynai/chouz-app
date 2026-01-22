import FooterSection from "@/components/homepage/footer";
// import ForYouSection from "@/components/homepage/for-you-section";
import HeroSection from "@/components/homepage/hero-section";
import IntroVideoSection from "@/components/homepage/intro-video-section";
import SevenMorningsSection from "@/components/homepage/seven-mornings-section";
import SignupSection from "@/components/homepage/signup-section";
// import PricingTable from "./pricing/_component/pricing-table";
// import { getSubscriptionDetails } from "@/lib/subscription";
// import Integrations from "@/components/homepage/integrations";

export default async function Home() {
  // const subscriptionDetails = await getSubscriptionDetails();
  
  return (
    <div className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
      <HeroSection />
      <main className="mx-auto max-w-4xl space-y-32 px-6 pb-24">
        {/* <ForYouSection /> */}
        <IntroVideoSection />
        <SevenMorningsSection />
        <SignupSection />
      </main>
      {/* <Integrations />
      <PricingTable subscriptionDetails={subscriptionDetails} /> */}
      <FooterSection />
    </div>
  );
}
