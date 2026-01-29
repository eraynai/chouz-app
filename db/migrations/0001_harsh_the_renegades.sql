ALTER TABLE "user" ADD COLUMN "firstGreetingAccessDate" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "greetingDaysUsed" integer DEFAULT 0;