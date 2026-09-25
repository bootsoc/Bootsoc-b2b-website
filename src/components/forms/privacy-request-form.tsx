"use client";

import { submitPrivacyRequest } from "@/app/actions";
import { Checkbox, FormGuards, FormMessage, SelectField, SubmitButton, TextArea, TextField, useServerForm } from "@/components/forms/fields";


export function PrivacyRequestForm() {
  const { state, pending, onSubmit, formRef, errors } = useServerForm(submitPrivacyRequest);
  const e = errors;

  if (state.status === "success") return <FormMessage state={state} />;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative grid gap-5">
      <FormGuards />
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="What would you like to do?"
          name="requestType"
          error={e.requestType}
          options={[
            { value: "access", label: "Access or get a copy of my data" },
            { value: "delete", label: "Delete my data" },
            { value: "correct", label: "Correct my data" },
            { value: "opt_out", label: "Opt out of sale, sharing or targeted ads" },
            { value: "limit", label: "Limit use of sensitive data" },
            { value: "unsubscribe", label: "Stop all marketing contact" },
            { value: "appeal", label: "Appeal a decision on an earlier request" },
          ]}
        />
        <SelectField
          label="Where do you live?"
          name="jurisdiction"
          error={e.jurisdiction}
          options={[
            { value: "us-ca", label: "California" },
            { value: "us-other", label: "Another US state" },
            { value: "uk", label: "United Kingdom" },
            { value: "eu", label: "EU or EEA" },
            { value: "ca-qc", label: "Quebec" },
            { value: "ca-other", label: "Elsewhere in Canada" },
            { value: "other", label: "Somewhere else" },
          ]}
        />
        <TextField label="Full name" name="fullName" autoComplete="name" error={e.fullName} />
        <TextField
          label="Email address"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          hint="The address we may hold. We'll send a verification link here."
          error={e.email}
        />
        <TextField label="Company" name="company" autoComplete="organization" optional className="sm:col-span-2" />
      </div>
      <TextArea label="Details" name="details" optional placeholder="Anything that helps us find your records or understand your request…" />
      <Checkbox name="attest" required error={e.attest}>
        I confirm I am the person named above, or an authorized agent acting on their behalf with written permission.
      </Checkbox>
      <FormMessage state={state} />
      <div>
        <SubmitButton pending={pending} pendingLabel="Submitting…">Submit request</SubmitButton>
      </div>
    </form>
  );
}
