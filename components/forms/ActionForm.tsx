"use client";
import { startTransition, useActionState, useEffect, useRef } from "react";
import type { FormState } from "@/app/actions/forms";

// Shared shell for the public forms: sends the fields to a Server Action, shows the result,
// and clears the form only after a successful send (so nothing is lost on a validation error).
export function ActionForm({
  action,
  title,
  intro,
  submit,
  children,
}: {
  action: (state: FormState, fd: FormData) => Promise<FormState>;
  title?: string;
  intro?: string;
  submit: string;
  children: React.ReactNode;
}) {
  const [state, run, pending] = useActionState(action, null);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.ok) ref.current?.reset();
  }, [state]);

  return (
    <form
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => run(fd));
      }}
      className="border-t-4 border-moss bg-white p-[clamp(20px,4vw,32px)] shadow-[0_7px_29px_rgba(100,100,111,.2)]"
    >
      {title && <h3 className="text-[22px] font-semibold uppercase">{title}</h3>}
      {intro && <p className="text-[14.5px]">{intro}</p>}
      {children}
      {/* Spam trap: hidden from people, filled in by bots. */}
      <label className="absolute -left-[9999px]" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <button type="submit" disabled={pending} className="mt-5 w-full bg-moss px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[3px] text-white hover:bg-forest disabled:opacity-60">
        {pending ? "Sending…" : submit}
      </button>
      <p aria-live="polite" className={`mt-3.5 min-h-6 text-[15px] ${state && !state.ok ? "text-red-700" : "text-moss"}`}>{state?.message}</p>
    </form>
  );
}
