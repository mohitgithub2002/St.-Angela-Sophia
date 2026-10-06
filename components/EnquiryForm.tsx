"use client";
import { useState } from "react";
import { school } from "@/lib/data";

const field = "w-full border border-lichen bg-white px-4 py-3 text-[15px] text-forest focus:border-moss focus:outline-none focus:ring-3 focus:ring-lichen/50";
const label = "mt-4 flex flex-col gap-1.5 text-[14px] font-medium";

// Opens the parent's email app with the enquiry filled in.
// To collect enquiries on a server instead, post the form data to an API route.
export function EnquiryForm() {
  const [msg, setMsg] = useState<{ text: string; error?: boolean } | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("pname") ?? "").trim();
    const phone = String(f.get("phone") ?? "").trim();
    if (!name) return setMsg({ text: "Add your name so we know who to call.", error: true });
    if (!/^[0-9+\s-]{8,}$/.test(phone)) return setMsg({ text: "Add a mobile number with at least 8 digits.", error: true });
    const cls = String(f.get("cls"));
    const body = `Parent: ${name}\nMobile: ${phone}\nDaughter: ${f.get("cname") ?? ""}\nClass: ${cls}\n\n${f.get("msg") ?? ""}`;
    window.location.href = `mailto:${school.email}?subject=${encodeURIComponent(`Admission enquiry: ${cls}`)}&body=${encodeURIComponent(body)}`;
    setMsg({ text: "Your email app is opening with your enquiry filled in. Press send there to reach the school office." });
  }

  return (
    <form noValidate onSubmit={onSubmit} className="border-t-4 border-moss bg-white p-8 shadow-[0_7px_29px_rgba(100,100,111,.2)]">
      <h3 className="text-[22px] font-semibold uppercase">Send an enquiry</h3>
      <p className="text-[14.5px]">We usually reply within two working days.</p>
      <div className="grid gap-x-3.5 sm:grid-cols-2">
        <label className={label}>Parent&apos;s name<input name="pname" autoComplete="name" required className={field} /></label>
        <label className={label}>Mobile number<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={field} /></label>
        <label className={label}>Daughter&apos;s name<input name="cname" className={field} /></label>
        <label className={label}>Class you&apos;re interested in
          <select name="cls" className={field}>
            {["Nursery", "LKG", "HKG", "Class I", "Class II–X (transfer)", "Class XI"].map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
      </div>
      <label className={label}>Your question
        <textarea name="msg" rows={4} placeholder="For example: I'd like to visit on a Saturday morning." className={field} />
      </label>
      <button type="submit" className="mt-5 w-full bg-moss px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[3px] text-white hover:bg-forest">Send enquiry</button>
      <p aria-live="polite" className={`mt-3.5 min-h-6 text-[15px] ${msg?.error ? "text-red-700" : "text-moss"}`}>{msg?.text}</p>
    </form>
  );
}
