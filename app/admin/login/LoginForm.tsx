"use client";
import { useActionState } from "react";
import { signIn } from "../actions";
import { inputCls } from "@/components/admin/FieldsForm";

export function LoginForm() {
  const [state, run, pending] = useActionState(signIn, null);
  return (
    <form action={run} className="space-y-4">
      <label className="block text-[14px] font-medium text-forest">Email<input name="email" type="email" autoComplete="username" required className={`${inputCls} mt-1.5`} /></label>
      <label className="block text-[14px] font-medium text-forest">Password<input name="password" type="password" autoComplete="current-password" required className={`${inputCls} mt-1.5`} /></label>
      <button type="submit" disabled={pending} className="btn w-full disabled:opacity-60">{pending ? "Signing in…" : "Sign in"}</button>
      {state && !state.ok && <p role="alert" className="text-[14px] text-red-700">{state.message}</p>}
    </form>
  );
}
