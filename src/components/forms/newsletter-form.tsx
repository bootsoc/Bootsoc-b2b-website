"use client";

import { subscribeNewsletter } from "@/app/actions";
import { Checkbox, FormGuards, FormMessage, SubmitButton, useServerForm } from "@/components/forms/fields";


export function NewsletterForm() {
  const { state, pending, onSubmit, formRef } = useServerForm(subscribeNewsletter);

  if (state.status === "success") return <div className="mt-4"><FormMessage state={state} /></div>;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative mt-4 grid gap-3">
      <FormGuards />
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Newsletter email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          placeholder="you@company.com…"
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          className="min-h-12 w-full min-w-0 rounded-full bg-raise px-5 text-fg ring-1 ring-line placeholder:text-muted/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal aria-[invalid=true]:ring-danger"
        />
        <SubmitButton pending={pending} pendingLabel="Joining…" className="shrink-0 px-5">
          Subscribe
        </SubmitButton>
      </div>
      <Checkbox name="consent" required error={state.fieldErrors?.consent}>
        Email me BootSoc&apos;s monthly notes. I can unsubscribe at any time.
      </Checkbox>
      {state.fieldErrors?.email && <p className="text-sm text-danger">{state.fieldErrors.email}</p>}
      {state.status === "error" && !state.fieldErrors && <FormMessage state={state} />}
    </form>
  );
}
