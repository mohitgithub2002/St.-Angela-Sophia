import { school } from "@/lib/data";
import { Crest } from "./Crest";
import { Icon } from "./Icon";

const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {});

const cols: { h: string; links: [string, string][] }[] = [
  { h: "About Us", links: [["About Us / Mission", "#about"], ["Principal's Message", "#principal"], ["Our History", "#history"], ["Achievers", "#achievers"], ["Mandatory Disclosure", school.disclosureUrl]] },
  { h: "Admission", links: [["Admission Procedure", "#admissions"], ["Age Eligibility", "#age-check"], ["Apply Online", school.registrationUrl], ["Online Enquiry", "#visit"], ["Book Lists & Circulars", "http://www.stangelasophiajaipur.in/"]] },
];

export function Footer() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent("St Angela Sophia School, Ghat Gate, Jaipur")}&t=m&z=14&output=embed`;
  return (
    <footer className="bg-gradient-to-b from-moss to-forest pb-20 text-white/65 md:pb-0">
      <div className="wrap grid gap-10 pb-12 pt-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <Crest className="h-[60px] w-[53px]" />
            <span className="font-serif text-[19px] font-semibold uppercase leading-tight text-white">{school.short}</span>
          </a>
          <p className="mt-5 text-[14px] leading-[1.8]">
            A CBSE girls&apos; school run by the Mission Sisters of Ajmer, educating the girls of Jaipur since 1926. Affiliation no. {school.affiliation}, school code {school.schoolCode}.
          </p>
        </div>

        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="mb-4 text-[20px] font-medium !text-white">{c.h}</h4>
            <ul className="space-y-2 text-[14px]">
              {c.links.map(([t, href]) => (
                <li key={t}><a href={href} {...ext(href)} className="transition-colors hover:text-white">{t}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-[20px] font-medium !text-white">Connect with Us</h4>
          <ul className="space-y-3 text-[14px]">
            <li className="flex gap-3"><Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-lichen" /><span><a href={school.phoneHref} className="hover:text-white">{school.phone}</a><br /><a href={school.mobileHref} className="hover:text-white">{school.mobile}</a></span></li>
            <li className="flex gap-3"><Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-lichen" /><span>{school.address}<br />{school.landmark}</span></li>
            <li className="flex gap-3"><Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-lichen" /><a href={`mailto:${school.email}`} className="break-all hover:text-white">{school.email}</a></li>
          </ul>
          <iframe
            title="Map showing St. Angela Sophia School"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="mt-5 h-[150px] w-full border-0"
          />
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap flex flex-col items-center justify-between gap-2 py-5 text-[13px] sm:flex-row">
          <p>© {new Date().getFullYear()} {school.name}, Jaipur. All rights reserved.</p>
          <a href="#visit" className="hover:text-white">Contact us</a>
        </div>
      </div>
    </footer>
  );
}
