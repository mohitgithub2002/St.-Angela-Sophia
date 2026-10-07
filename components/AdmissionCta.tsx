import Link from "next/link";
import type { Settings } from "@/lib/types";

export function AdmissionCta({ settings: s }: { settings: Settings }) {
  return (
    <section aria-label="Admissions open" className="bg-moss py-10 text-white">
      <div className="wrap flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <div>
          <h2 className="text-[clamp(20px,2.4vw,26px)] !text-white">{s.admissionCtaTitle}</h2>
          <p className="text-white/80">{s.admissionCtaText}</p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-center gap-3">
          <a href={s.registrationUrl} target="_blank" rel="noopener" className="bg-white px-6 py-3 text-[13px] font-medium uppercase tracking-wider text-moss transition-colors hover:bg-forest hover:text-white">Apply Online</a>
          <Link href="/contact" className="border border-white px-6 py-3 text-[13px] font-medium uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-moss">Enquire Now</Link>
        </div>
      </div>
    </section>
  );
}
