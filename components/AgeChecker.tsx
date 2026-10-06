"use client";
import { useState } from "react";

// Birth-date bands from the school's 2026–27 rules. Class I is for girls born
// 1 Apr (session − 7) to 31 Mar (session − 6), and so on down to Nursery.
const bands: [string, number][] = [["Nursery", 4], ["LKG", 5], ["HKG", 6], ["Class I", 7]];

function classFor(dob: string, session: number) {
  const d = new Date(`${dob}T00:00:00`);
  for (const [name, offset] of bands) {
    const start = new Date(`${session - offset}-04-01T00:00:00`);
    const end = new Date(`${session - offset + 1}-03-31T00:00:00`);
    if (d >= start && d <= end) return { kind: "fit" as const, name };
  }
  return d < new Date(`${session - 7}-04-01T00:00:00`) ? { kind: "older" as const } : { kind: "young" as const };
}

export function AgeChecker() {
  const [dob, setDob] = useState("");
  const [session, setSession] = useState(2027);
  const r = dob ? classFor(dob, session) : null;
  const label = session === 2027 ? "2027–28 (expected)" : "2026–27";

  return (
    <div id="age-check" className="border-t-4 border-moss bg-white p-8 shadow-[0_7px_29px_rgba(100,100,111,.2)]">
      <h3 className="mb-1.5 text-[22px] font-semibold">Which class can my daughter join?</h3>
      <p className="text-[14.5px]">Enter her date of birth to see the class she fits by age.</p>
      <label className="mt-4 flex flex-col gap-1.5 text-[14.5px] font-medium">
        Date of birth
        <input type="date" value={dob} min="2015-01-01" max="2026-12-31" onChange={(e) => setDob(e.target.value)}
          className="w-full border border-lichen bg-white px-4 py-3 text-[15px] focus:border-moss focus:outline-none focus:ring-3 focus:ring-lichen/50" />
      </label>
      <label className="mt-4 flex flex-col gap-1.5 text-[14.5px] font-semibold">
        Academic session
        <select value={session} onChange={(e) => setSession(Number(e.target.value))}
          className="w-full border border-lichen bg-white px-4 py-3 text-[15px] focus:border-moss focus:outline-none focus:ring-3 focus:ring-lichen/50">
          <option value={2027}>2027–28 (expected, confirm with school)</option>
          <option value={2026}>2026–27 (published)</option>
        </select>
      </label>
      <div aria-live="polite" className="mt-5 min-h-16 border-l-4 border-moss bg-moss/5 px-5 py-4">
        {!r && <span className="text-forest/60">Her class will show here.</span>}
        {r?.kind === "fit" && (
          <>
            <b className="block text-[20px] font-semibold text-moss">{r.name}</b>
            She fits {r.name} for {label}.{session === 2027 && " Dates are based on last year's rules, so please confirm with the school."}
          </>
        )}
        {r?.kind === "older" && (
          <>
            <b className="block text-[20px] font-semibold text-moss">Class II or above</b>
            Entry above Class I is open only to families moving to Jaipur from another district or state. Call us to talk it through.
          </>
        )}
        {r?.kind === "young" && (
          <>
            <b className="block text-[20px] font-semibold text-moss">Too young this year</b>
            She can apply for Nursery in a later session.
          </>
        )}
      </div>
    </div>
  );
}
