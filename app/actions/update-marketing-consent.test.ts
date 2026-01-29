import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/db/drizzle", () => {
  return {
    db: {
      update: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValue(undefined),
    },
  };
});

vi.mock("@/db/schema", () => ({
  user: {},
}));

// eq is only passed through; implementation is irrelevant for this unit test
vi.mock("drizzle-orm", () => ({
  eq: vi.fn((a, b) => ({ a, b })),
}));

import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { updateMarketingConsent } from "./update-marketing-consent";

const mockedDb = db as unknown as {
  update: ReturnType<typeof vi.fn>;
  set: ReturnType<typeof vi.fn>;
  where: ReturnType<typeof vi.fn>;
};

describe("updateMarketingConsent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully updates marketing consent and date in the database", async () => {
    const email = "test@example.com";
    const consent = true;

    const result = await updateMarketingConsent(email, consent);

    expect(result).toEqual({ success: true });
    expect(mockedDb.update).toHaveBeenCalledWith(user);
    expect(mockedDb.set).toHaveBeenCalledWith(
      expect.objectContaining({
        marketingConsent: true,
      }),
    );
    expect(mockedDb.where).toHaveBeenCalled();
  });
});
