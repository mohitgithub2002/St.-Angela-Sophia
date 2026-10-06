"use client";
import { useRef, useState } from "react";
import { stages } from "@/lib/data";

export function Journey() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = stages[active];

  function onKey(e: React.KeyboardEvent, i: number) {
    const step = ["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : ["ArrowUp", "ArrowLeft"].includes(e.key) ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + stages.length) % stages.length;
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="grid items-stretch gap-6 md:grid-cols-[.8fr_1.2fr]">
      <div role="tablist" aria-label="School stages" className="flex flex-col gap-2">
        {stages.map((st, i) => (
          <button
            key={st.title}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            aria-selected={active === i}
            aria-controls="stage-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`flex items-center justify-between border-l-4 px-5 py-4 text-left transition-colors ${
              active === i ? "border-lichen bg-moss text-white" : "border-moss bg-gradient-to-r from-pista to-white text-moss hover:from-moss/10"
            }`}
          >
            <b className="text-[16px] font-semibold uppercase">{st.title}</b>
            <span className="text-[13px] opacity-85">{st.classes}</span>
          </button>
        ))}
      </div>
      <div id="stage-panel" role="tabpanel" aria-live="polite" className="border border-lichen bg-white p-8 shadow-[0_2px_8px_rgba(99,99,99,.15)]">
        <h3 className="text-[24px] font-semibold uppercase">{s.title}</h3>
        <p className="mb-4 font-semibold text-moss">{s.classes}</p>
        <p>{s.text}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {s.subjects.map((x) => <li key={x} className="bg-moss/10 px-3.5 py-1.5 text-[13.5px] text-forest">{x}</li>)}
        </ul>
      </div>
    </div>
  );
}
