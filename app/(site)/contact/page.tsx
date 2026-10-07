import type { Metadata } from "next";
import { submitEnquiry } from "@/app/actions/forms";
import { ActionForm } from "@/components/forms/ActionForm";
import { Input, Row, Select, Textarea } from "@/components/forms/fields";
import { Icon } from "@/components/Icon";
import { PageShell } from "@/components/page/PageShell";
import { getSettings } from "@/lib/content";
import { telHref } from "@/lib/format";

export const metadata: Metadata = { title: "Contact Us" };

export default async function Contact() {
  const s = await getSettings();
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`${s.short} School, Ghat Gate, Jaipur`)}&t=m&z=15&output=embed`;
  const lines: { icon: "pin" | "phone" | "mail" | "calendar"; title: string; body: React.ReactNode }[] = [
    { icon: "pin", title: "Address", body: <>{s.name}<br />{s.address} – {s.pin}<br />{s.landmark}</> },
    { icon: "phone", title: "Phone", body: <><a href={telHref(s.phone)} className="text-moss underline">{s.phone}</a> (office)<br /><a href={telHref(s.mobile)} className="text-moss underline">{s.mobile}</a> (admissions)</> },
    { icon: "mail", title: "Email", body: <><a href={`mailto:${s.email}`} className="break-all text-moss underline">{s.email}</a>{s.admissionsEmail && <><br />Admissions: <a href={`mailto:${s.admissionsEmail}`} className="break-all text-moss underline">{s.admissionsEmail}</a></>}</> },
    { icon: "calendar", title: "Office timings", body: <>{s.officeHours}{s.visitingHours && <><br />{s.visitingHours}</>}</> },
  ];
  return (
    <PageShell section="contact" href="/contact" title="Contact Us" intro="Come and see a school day. Call, write or send us a message and we'll get back to you.">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {lines.map((l) => (
              <li key={l.title} className="border-t-[3px] border-sage bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,.06)]">
                <Icon name={l.icon} className="h-8 w-8 text-moss" />
                <h2 className="mt-2 text-[17px] font-semibold uppercase">{l.title}</h2>
                <p className="mt-1 text-[14.5px]">{l.body}</p>
              </li>
            ))}
          </ul>
          <iframe title={`Map showing ${s.short} School`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-6 h-[300px] w-full border-0" />
          <a href={s.mapsUrl} target="_blank" rel="noopener" className="btn mt-4">Get directions in Google Maps</a>
        </div>
        <ActionForm action={submitEnquiry} title="Send us a message" intro="For general enquiries, admissions and feedback. We usually reply within two working days." submit="Send message">
          <Row>
            <Input label="Your name" name="name" autoComplete="name" required />
            <Input label="Mobile number" name="phone" type="tel" inputMode="tel" autoComplete="tel" required pattern="[0-9+\s\-]{8,15}" />
          </Row>
          <Input label="Email" name="email" type="email" autoComplete="email" />
          <Select label="Regarding" name="kind" options={[["contact", "General enquiry"], ["admission", "Admissions"]]} />
          <Input label="Subject" name="subject" />
          <Textarea label="Message" name="message" required rows={5} />
        </ActionForm>
      </div>
    </PageShell>
  );
}
