"use client";

import { consentStore } from "@/components/consent/store";
import { cn } from "@/lib/utils";

/** "Your Privacy Choices" control required by CPRA and other US state laws; opens the preferences dialog. */
export function PrivacyChoicesLink({ className, label = "Your privacy choices" }: { className?: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => consentStore.openPrefs()}
      className={cn("text-left text-sm text-muted transition-colors hover:text-fg", className)}
    >
      {label}
    </button>
  );
}
