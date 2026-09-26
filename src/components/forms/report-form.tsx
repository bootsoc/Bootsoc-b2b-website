"use client";

import Link from "next/link";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { requestReport } from "@/app/actions";
import { Checkbox, FormGuards, FormMessage, SelectField, SubmitButton, TextField, useServerForm, HumanCheck } from "@/components/forms/fields";

export function ReportForm() {
  const { state, pending, onSubmit, formRef, attempt, errors: e } = useServerForm(requestReport);

  if (state.status === "success" && state.downloadUrl) {
    return (
      <div className="grid gap-5">
        <FormMessage state={state} />
        <a
          href={state.downloadUrl}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-signal px-7 font-medium text-on-signal hover:bg-signal-press"
        >
          <DownloadSimpleIcon size={18} weight="bold" aria-hidden="true" />
          Download the report (PDF)
        </a>
        <p className="text-sm text-muted">
          Want to see how your current vendors score?{" "}
          <Link href="/contact" className="text-fg underline underline-offset-4">
            Book a strategy call
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <FormGuards />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" name="name" autoComplete="name" error={e.name} />
        <TextField label="Work email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} error={e.email} />
        <TextField label="Company" name="company" autoComplete="organization" error={e.company} />
        <TextField label="Job title" name="jobTitle" autoComplete="organization-title" error={e.jobTitle} />
      </div>
      <SelectField
        label="Country"
        name="country"
        autoComplete="country"
        error={e.country}
        options={[
          { value: "US", label: "United States" },
          { value: "GB", label: "United Kingdom" },
          { value: "CA", label: "Canada" },
          { value: "Other", label: "Somewhere else" },
        ]}
      />
      <Checkbox name="marketingConsent">
        Yes, BootSoc may email me insights, event invitations and offers. I can unsubscribe at any time.
      </Checkbox>
      <p className="text-sm text-muted">
        The report is free. We&apos;ll use your details to send it and, if you tick the box, occasional insights. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-fg">
          privacy policy
        </Link>
        .
      </p>
      <HumanCheck attempt={attempt} />
      <FormMessage state={state} />
      <div>
        <SubmitButton pending={pending} pendingLabel="Preparing…">
          Get the report
        </SubmitButton>
      </div>
    </form>
  );
}
