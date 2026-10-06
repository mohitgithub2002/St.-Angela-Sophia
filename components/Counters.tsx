"use client";
import { useEffect, useRef, useState } from "react";
import { facts } from "@/lib/data";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

// Numbers count up once the band scrolls into view.
export function Counters() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setP(1);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - start) / 1600);
        setP(1 - (1 - k) ** 3);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="The school in numbers" className="relative overflow-hidden py-16 text-white">
      <Photo src="counters-bg.jpg" alt="" sizes="100vw" className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-moss/90 to-forest/95" />
      <ul className="wrap relative grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {facts.map((f) => (
          <li key={f.label} className="text-center">
            <Icon name={f.icon} className="mx-auto h-11 w-11 text-lichen" />
            <b className="mt-3 block font-serif text-[clamp(36px,4.5vw,52px)] font-bold leading-none">
              {Math.round(Number(f.value) * p).toLocaleString("en-IN")}{f.suffix}
            </b>
            <span className="mt-2 block text-[14px] uppercase tracking-wider text-white/80">{f.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
