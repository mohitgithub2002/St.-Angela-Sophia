import { school } from "@/lib/data";

export function AdmissionCta() {
  return (
    <section aria-label="Admissions open" className="bg-moss py-10 text-white">
      <div className="wrap flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
        <div>
          <h2 className="text-[clamp(20px,2.4vw,26px)] !text-white">Admissions open for 2027–28</h2>
          <p className="text-white/80">Nursery to Class I registration is expected to open on 1 December. Call us or send an enquiry today.</p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-center gap-3">
          <a href={school.registrationUrl} target="_blank" rel="noopener" className="bg-white px-6 py-3 text-[13px] font-medium uppercase tracking-wider text-moss transition-colors hover:bg-forest hover:text-white">Apply Online</a>
          <a href="#visit" className="border border-white px-6 py-3 text-[13px] font-medium uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-moss">Enquire Now</a>
        </div>
      </div>
    </section>
  );
}
