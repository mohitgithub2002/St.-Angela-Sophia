import { admissionSteps, school } from "@/lib/data";
import { AgeChecker } from "./AgeChecker";
import { SectionHead } from "./SectionHead";

const notes = [
  { title: "Classes I to X", text: "Mid-way places are only for girls moving to Jaipur from another district or state, with a transfer order and an aptitude test." },
  { title: "Class XI", text: "Admission depends on Class X marks and seats. Each stream has its own minimum, shown above." },
  { title: "Fees for 2026–27", text: "The fee structure is published by the school office. Call us and we'll walk you through it." },
];

export function Admissions() {
  return (
    <section id="admissions" aria-labelledby="adm-title" className="bg-mint py-16">
      <div className="wrap">
        <SectionHead id="adm-title" title="Admission" accent="Procedure">
          Most girls join us in Nursery to Class I. Registration happens online once a year, usually from 1 December to early January.
        </SectionHead>
        <div className="grid items-start gap-10 md:grid-cols-[1.1fr_.9fr]">
          <ol className="space-y-3">
            {admissionSteps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[52px_1fr] gap-4 bg-white p-5 shadow-[0_2px_8px_rgba(99,99,99,.15)]">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-moss text-[20px] font-semibold text-white" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="mb-1 text-[17px] font-semibold">{s.title}</h3>
                  <p className="text-[14.5px]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <AgeChecker />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {notes.map((n) => (
            <div key={n.title} className="border-l-4 border-moss bg-gradient-to-r from-pista to-white p-5">
              <h3 className="mb-1.5 text-[16px] font-semibold">{n.title}</h3>
              <p className="text-[14.5px]">{n.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={school.registrationUrl} target="_blank" rel="noopener" className="btn">Online Registration</a>
          <a href={school.mobileHref} className="btn !bg-white !text-moss ring-1 ring-moss ring-inset hover:!bg-moss hover:!text-white">Call Admissions</a>
        </div>
      </div>
    </section>
  );
}
