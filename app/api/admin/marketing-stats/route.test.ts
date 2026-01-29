import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/headers to avoid real Next.js runtime
vi.mock("next/headers", () => ({
  headers: vi.fn(async () => new Headers()),
}));

const getSessionMock = vi.fn();

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: (...args: any[]) => getSessionMock(...args),
    },
  },
}));

const selectMock = vi.fn();

vi.mock("@/db/drizzle", () => ({
  db: {
    select: (...args: any[]) => selectMock(...args),
  },
}));

vi.mock("@/db/schema", () => ({
  user: {},
}));

import { GET } from "./route";

describe("GET /api/admin/marketing-stats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.DEVELOPER_EMAILS;
  });

  it("returns correct statistics for an admin user", async () => {
    process.env.DEVELOPER_EMAILS = "admin@example.com";

    getSessionMock.mockResolvedValueOnce({
      user: { email: "admin@example.com" },
    });

    const allUsers = [
      { email: "a@example.com", name: "A", marketingConsent: true, marketingConsentDate: new Date() },
      { email: "b@example.com", name: "B", marketingConsent: false, marketingConsentDate: null },
      { email: "c@example.com", name: "C", marketingConsent: true, marketingConsentDate: new Date() },
    ];

    const consentedUsers = allUsers.filter((u) => u.marketingConsent);

    selectMock
      .mockReturnValueOnce({
        from: () => allUsers,
      })
      .mockReturnValueOnce({
        from: () => ({
          where: () => consentedUsers,
        }),
      });

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.totalUsers).toBe(allUsers.length);
    expect(json.usersWithConsent).toBe(consentedUsers.length);
    expect(json.usersWithoutConsent).toBe(allUsers.length - consentedUsers.length);
    expect(json.consentRate).toBe("66.7%");
    expect(json.consentedEmails).toHaveLength(consentedUsers.length);
  });

  it("denies access to non-admin users with a 403 status", async () => {
    process.env.DEVELOPER_EMAILS = "admin@example.com";

    getSessionMock.mockResolvedValueOnce({
      user: { email: "user@example.com" },
    });

    const response = await GET();
    const json = await response.json();

    expect(response.status).toBe(403);
    expect(json).toEqual({ error: "Forbidden" });
  });
});
