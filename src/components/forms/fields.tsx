"use client";

import { startTransition, useActionState, useEffect, useId, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react";
import type { FormState } from "@/app/actions";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full min-h-12 rounded-xl bg-bg px-4 py-3 text-fg ring-1 ring-line placeholder:text-muted/80 transition-[box-shadow] duration-200 hover:ring-fg/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal aria-[invalid=true]:ring-danger [[data-theme=light]_&]:focus-visible:ring-fg";

type FieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
};

function useFieldIds(name: string) {
  const id = useId();
  return { inputId: `${name}-${id}`, hintId: `${name}-${id}-hint`, errorId: `${name}-${id}-error` };
}

function Label({ htmlFor, label, optional }: { htmlFor: string; label: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium">
      {label}
      {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
    </label>
  );
}

function Meta({ hint, error, hintId, errorId }: { hint?: string; error?: string; hintId: string; errorId: string }) {
  return (
    <>
      {hint && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-sm text-danger">
          <WarningCircleIcon size={16} aria-hidden="true" />
          {error}
        </p>
      )}
    </>
  );
}

export function TextField({
  label,
  name,
  error,
  hint,
  optional,
  className,
  ...input
}: FieldProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">) {
  const { inputId, hintId, errorId } = useFieldIds(name);
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={inputId} label={label} optional={optional} />
      <input
        id={inputId}
        name={name}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hint && hintId, error && errorId) || undefined}
        className={inputBase}
        {...input}
      />
      <Meta hint={hint} error={error} hintId={hintId} errorId={errorId} />
    </div>
  );
}

export function TextArea({
  label,
  name,
  error,
  hint,
  optional,
  className,
  ...input
}: FieldProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name">) {
  const { inputId, hintId, errorId } = useFieldIds(name);
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={inputId} label={label} optional={optional} />
      <textarea
        id={inputId}
        name={name}
        required={!optional}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hint && hintId, error && errorId) || undefined}
        className={cn(inputBase, "resize-y")}
        {...input}
      />
      <Meta hint={hint} error={error} hintId={hintId} errorId={errorId} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  optional,
  className,
  options,
  placeholder = "Select…",
  ...input
}: FieldProps & { options: { value: string; label: string }[]; placeholder?: string } & Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "name"
  >) {
  const { inputId, hintId, errorId } = useFieldIds(name);
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={inputId} label={label} optional={optional} />
      <select
        id={inputId}
        name={name}
        required={!optional}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hint && hintId, error && errorId) || undefined}
        className={cn(inputBase, "appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' fill='%23a1a197'%3E%3Cpath d='M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32Z'/%3E%3C/svg%3E\")",
        }}
        {...input}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Meta hint={hint} error={error} hintId={hintId} errorId={errorId} />
    </div>
  );
}

export function Checkbox({
  name,
  children,
  error,
  required,
  defaultChecked,
}: {
  name: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  defaultChecked?: boolean;
}) {
  const id = useId();
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          id={id}
          type="checkbox"
          name={name}
          required={required}
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-md accent-signal"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-danger">
          <WarningCircleIcon size={16} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/** Honeypot, fill-time stamp, source path, UTM parameters and (optionally) Cloudflare Turnstile. */
export function FormGuards() {
  const pathname = usePathname();
  const tRef = useRef<HTMLInputElement>(null);
  const utmRef = useRef<HTMLInputElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (tRef.current) tRef.current.value = String(Date.now());
    if (utmRef.current) {
      const params = new URLSearchParams(window.location.search);
      const utm = Object.fromEntries([...params].filter(([k]) => k.startsWith("utm_")));
      if (Object.keys(utm).length) utmRef.current.value = JSON.stringify(utm);
    }
  }, []);

  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="bs_hp_check" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" />
        </label>
      </div>
      <input ref={tRef} type="hidden" name="_t" defaultValue="" />
      <input ref={utmRef} type="hidden" name="_utm" defaultValue="" />
      <input type="hidden" name="_path" value={pathname} />
      {siteKey && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={siteKey} data-theme="auto" />
        </>
      )}
    </>
  );
}

export function SubmitButton({
  children,
  pending = false,
  pendingLabel = "Sending…",
  className,
}: {
  children: React.ReactNode;
  pending?: boolean;
  pendingLabel?: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-signal px-7 font-medium text-on-signal transition-[background-color,transform] duration-300 hover:bg-signal-press active:scale-[0.98] disabled:cursor-progress disabled:opacity-70",
        className,
      )}
    >
      {pending && <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-on-signal/30 border-t-on-signal" />}
      {pending ? pendingLabel : children}
    </button>
  );
}

export function FormMessage({ state }: { state: FormState }) {
  return (
    <div aria-live="polite" role="status">
      {state.status !== "idle" && state.message && (
        <p
          className={cn(
            "flex items-start gap-2 rounded-xl px-4 py-3 text-sm ring-1",
            state.status === "success" ? "bg-ok/10 text-fg ring-ok/40" : "bg-danger/10 text-fg ring-danger/40",
          )}
        >
          {state.status === "success" ? (
            <CheckCircleIcon size={18} weight="fill" className="mt-px shrink-0 text-ok" aria-hidden="true" />
          ) : (
            <WarningCircleIcon size={18} weight="fill" className="mt-px shrink-0 text-danger" aria-hidden="true" />
          )}
          {state.message}
        </p>
      )}
    </div>
  );
}

/** Moves focus to the first invalid field after a failed submit. */
export function useFocusFirstError(state: FormState, formRef: React.RefObject<HTMLFormElement | null>) {
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state, formRef]);
}

/**
 * Wraps a server action for use with onSubmit. Unlike `<form action>`, this keeps what the visitor typed
 * when validation fails (React resets uncontrolled forms after an action prop completes).
 */
export function useServerForm(action: (prev: FormState, data: FormData) => Promise<FormState>) {
  const [state, dispatch, pending] = useActionState(action, { status: "idle" } as FormState);
  const formRef = useRef<HTMLFormElement>(null);
  useFocusFirstError(state, formRef);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => dispatch(data));
  };
  return { state, pending, onSubmit, formRef, errors: state.fieldErrors ?? {} };
}
