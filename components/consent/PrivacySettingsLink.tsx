"use client";

import { useEffect, useState } from "react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type PrivacySettingsLinkProps = {
  className?: string;
};

export default function PrivacySettingsLink({ className }: PrivacySettingsLinkProps) {
  const { analyticsConsent, setAnalyticsConsent } = useConsent();
  const [open, setOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    if (open) {
      setAnalyticsEnabled(analyticsConsent === "granted");
    }
  }, [open, analyticsConsent]);

  return (
    <>
      <button
        type="button"
        className={cn("transition-colors hover:text-primary dark:hover:text-white", className)}
        onClick={() => setOpen(true)}
      >
        Privacy settings
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Privacy settings</DialogTitle>
            <DialogDescription>
              Choose whether Chouz can use analytics cookies to improve the experience.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-3 text-sm dark:border-gray-800">
            <div>
              <Label className="font-medium" htmlFor="analytics-consent">
                Analytics cookies
              </Label>
              <p className="text-xs text-muted-light dark:text-muted-dark">
                Helps us understand product usage and improve the experience.
              </p>
            </div>
            <Switch
              id="analytics-consent"
              checked={analyticsEnabled}
              onCheckedChange={setAnalyticsEnabled}
              aria-label="Toggle analytics cookies"
            />
          </div>

          <DialogFooter>
            <button
              type="button"
              className="rounded-full border border-gray-300 px-4 py-2 text-xs font-medium text-muted-light transition-colors hover:border-primary hover:text-primary dark:border-gray-700 dark:text-muted-dark dark:hover:text-white"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
              onClick={() => {
                setAnalyticsConsent(analyticsEnabled ? "granted" : "denied");
                setOpen(false);
              }}
            >
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
