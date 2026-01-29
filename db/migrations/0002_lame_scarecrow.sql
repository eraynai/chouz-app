ALTER TABLE "user" ADD COLUMN "marketingConsent" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "marketingConsentDate" timestamp;