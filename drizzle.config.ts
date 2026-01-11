import { config } from "dotenv";
import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

config({ path: existsSync(".env.local") ? ".env.local" : ".env" });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
