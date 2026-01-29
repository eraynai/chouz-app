import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SectionCards } from "./_components/section-cards";
import { ChartAreaInteractive } from "./_components/chart-interactive";
import { MarketingStats } from "./_components/marketing-stats";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const result = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!result?.session?.userId) {
    redirect("/sign-in");
  }

  // Check if user is admin/founder
  const developerEmails = process.env.DEVELOPER_EMAILS?.split(",") || [];
  if (!developerEmails.includes(result.user.email)) {
    redirect("/greet");
  }

  return (
    <section className="flex flex-col items-start justify-start p-6 w-full">
      <div className="w-full">
        <div className="flex flex-col items-start justify-center gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Founder-only view of app analytics and user data.
          </p>
        </div>
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <MarketingStats />
            <SectionCards />
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </section>
  );
}
