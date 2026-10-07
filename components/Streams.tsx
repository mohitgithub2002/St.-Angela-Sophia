"use client";
import { useState } from "react";
import type { Stream } from "@/lib/types";

const C = 2 * Math.PI * 62;

export function Streams({ streams }: { streams: Stream[] }) {
  const [i, setI] = useState(0);
  const s = streams[i];
  if (!s) return null;
  return (
    <div id="streams" className="mt-16">
      <h3 className="mb-2 text-center text-[clamp(20px,2.4vw,26px)] font-semibold uppercase">Streams in Classes XI and XII</h3>
      <p className="text-center">Seats are limited and given on Class X marks. Pick a stream to see what it needs.</p>
      <div role="tablist" aria-label="Senior secondary streams" className="my-6 flex flex-wrap justify-center gap-2">
        {streams.map((st, j) => (
          <button
            key={st.id}
            role="tab"
            aria-selected={i === j}
            aria-controls="stream-panel"
            onClick={() => setI(j)}
            className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors ${i === j ? "border-moss bg-moss text-white" : "border-moss/30 bg-white text-moss hover:bg-moss/10"}`}
          >
            {st.name}
          </button>
        ))}
      </div>
      <div id="stream-panel" role="tabpanel" aria-live="polite" className="mx-auto grid max-w-4xl items-center gap-9 bg-mint p-8 sm:grid-cols-[auto_1fr]">
        <div className="relative mx-auto h-[150px] w-[150px]">
          <svg viewBox="0 0 150 150" className="-rotate-90" aria-hidden="true">
            <circle cx="75" cy="75" r="62" fill="none" strokeWidth="12" stroke="#E3EED4" />
            <circle
              cx="75" cy="75" r="62" fill="none" strokeWidth="12" strokeLinecap="round"
              className="stroke-moss transition-[stroke-dashoffset] duration-700"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - s.min / 100)}
            />
          </svg>
          <div className="absolute inset-0 grid place-content-center text-center">
            <strong className="text-[34px] font-bold leading-none text-moss">{s.min}%</strong>
            <small className="text-[12px] text-forest/70">minimum in X</small>
          </div>
        </div>
        <div>
          <h4 className="mb-1.5 text-[20px] font-semibold">{s.name}</h4>
          <p className="mb-3 font-semibold text-moss">Needs {s.need}</p>
          <p>{s.subjects}</p>
        </div>
      </div>
    </div>
  );
}
