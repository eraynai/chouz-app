import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock updateMarketingConsent action
const updateMarketingConsentMock = vi.fn();
vi.mock("@/app/actions/update-marketing-consent", () => ({
  updateMarketingConsent: (...args: unknown[]) => updateMarketingConsentMock(...args),
}));

// Mock authClient magic link sign-in
const magicLinkMock = vi.fn().mockResolvedValue(undefined);
vi.mock("@/lib/auth-client", () => ({
  authClient: {
    signIn: {
      magicLink: (...args: unknown[]) => magicLinkMock(...args),
      social: vi.fn(),
    },
  },
}));

// Mock next/navigation useSearchParams
vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}));

// Mock toast to avoid console noise
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

import SignIn from "./page";

describe("Sign-in marketing consent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates marketing consent based on the user's selection", async () => {
    render(<SignIn />);

    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const marketingCheckbox = screen.getByLabelText(/i'd like to receive updates about chouz/i) as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: /send magic link/i });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.click(marketingCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(magicLinkMock).toHaveBeenCalledWith({
        email: "user@example.com",
        callbackURL: "/greet",
      });
      expect(updateMarketingConsentMock).toHaveBeenCalledWith("user@example.com", true);
    });
  });
});
