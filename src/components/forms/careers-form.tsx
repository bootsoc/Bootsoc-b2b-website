"use client";

import Link from "next/link";
import { submitApplication } from "@/app/actions";
import { FormGuards, FormMessage, SubmitButton, TextArea, TextField, useServerForm } from "@/components/forms/fields";


export function CareersForm() {
  const { state, pending, onSubmit, formRef, errors } = useServerForm(submitApplication);
  const e = errors;

  if (state.status === "success") return <FormMessage state={state} />;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <FormGuards />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" name="name" autoComplete="name" error={e.name} />
        <TextField label="Email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} error={e.email} />
        <TextField label="Role you're interested in" name="role" placeholder="SDR, data analyst, media buyer…" error={e.role} />
        <TextField label="Location" name="location" autoComplete="address-level2" placeholder="Toronto, Canada…" error={e.location} />
      </div>
      <TextField
        label="LinkedIn or portfolio URL"
        name="profileUrl"
        type="url"
        inputMode="url"
        spellCheck={false}
        placeholder="https://linkedin.com/in/you…"
        hint="Share a link to your CV or profile instead of uploading a file."
        error={e.profileUrl}
      />
      <TextArea label="Anything else we should know?" name="message" optional />
      <p className="text-sm text-muted">
        We keep applications for 12 months, then delete them. See the{" "}
        <Link href="/privacy#applicants" className="underline underline-offset-2 hover:text-fg">
          applicant privacy notice
        </Link>
        .
      </p>
      <FormMessage state={state} />
      <div>
        <SubmitButton pending={pending}>Send application</SubmitButton>
      </div>
    </form>
  );
}
