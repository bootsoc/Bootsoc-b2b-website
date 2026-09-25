"use client";

import Link from "next/link";
import { submitLead } from "@/app/actions";
import { services } from "@/content/services";
import { Checkbox, FormGuards, FormMessage, SelectField, SubmitButton, TextArea, TextField, useServerForm } from "@/components/forms/fields";


export function ContactForm({ intent = "contact" }: { intent?: "contact" | "sample" }) {
  const { state, pending, onSubmit, formRef, errors } = useServerForm(submitLead);
  const e = errors;

  if (state.status === "success") {
    return (
      <div className="grid gap-4">
        <FormMessage state={state} />
        <p className="text-sm text-muted">
          While you wait, try the <Link className="underline underline-offset-2 hover:text-fg" href="/audience-estimator">audience estimator</Link>.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <input type="hidden" name="kind" value={intent} />
      <FormGuards />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" name="name" autoComplete="name" placeholder="Jordan Ellis…" error={e.name} />
        <TextField
          label="Work email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="jordan@company.com…"
          error={e.email}
        />
        <TextField label="Company" name="company" autoComplete="organization" placeholder="Northwind Security…" error={e.company} />
        <TextField label="Job title" name="jobTitle" autoComplete="organization-title" placeholder="Director of Demand Gen…" optional />
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
        <SelectField
          label="Most interested in"
          name="interest"
          optional
          options={[...services.map((s) => ({ value: s.slug, label: s.product ?? s.name })), { value: "not-sure", label: "Not sure yet" }]}
        />
      </div>
      <TextArea
        label={intent === "sample" ? "Your target spec" : "What are you trying to achieve?"}
        name="message"
        optional
        placeholder={
          intent === "sample"
            ? "e.g. IT directors at 500+ employee healthcare companies in the US and UK…"
            : "e.g. 400 BANT leads per quarter for our SIEM product in North America…"
        }
      />
      <Checkbox name="marketingConsent">
        Yes, BootSoc may email me insights, event invitations and offers. I can unsubscribe at any time.
      </Checkbox>
      <p className="text-sm text-muted">
        We&apos;ll use your details to respond to this request. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-fg">
          privacy policy
        </Link>{" "}
        for how we handle personal data.
      </p>
      <FormMessage state={state} />
      <div>
        <SubmitButton pending={pending}>{intent === "sample" ? "Request sample file" : "Book a strategy call"}</SubmitButton>
      </div>
    </form>
  );
}
