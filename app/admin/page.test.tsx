import { describe, it, expect, vi, beforeEach } from "vitest";

const getSessionMock = vi.fn();
const redirectMock = vi.fn();

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: (...args: unknown[]) => getSessionMock(...args),
    },
  },
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(async () => new Headers()),
}));

vi.mock("next/navigation", () => ({
  redirect: (...args: unknown[]) => redirectMock(...args),
}));

// Mock admin dashboard child components to avoid React/DOM requirements
vi.mock("./_components/section-cards", () => ({
  SectionCards: () => null,
}));

vi.mock("./_components/chart-interactive", () => ({
  ChartAreaInteractive: () => null,
}));

vi.mock("./_components/marketing-stats", () => ({
  MarketingStats: () => null,
}));

import Dashboard from "./page";

describe("Admin dashboard access control", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.DEVELOPER_EMAILS;
  });

  it("redirects non-admin users to /greet", async () => {
    process.env.DEVELOPER_EMAILS = "admin@example.com";

    getSessionMock.mockResolvedValueOnce({
      session: { userId: "user-1" },
      user: { email: "user@example.com" },
    });

    await Dashboard();

    expect(redirectMock).toHaveBeenCalledWith("/greet");
  });
});
