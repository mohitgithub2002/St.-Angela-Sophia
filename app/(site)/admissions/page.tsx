import type { Metadata } from "next";
import { Admissions } from "@/components/Admissions";
import { Block, PageShell } from "@/components/page/PageShell";
import { RichText } from "@/components/RichText";
import { getAdmissionSteps, getPage, getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Admission Procedure" };

export default async function AdmissionProcedure() {
  const [steps, s, docs] = await Promise.all([getAdmissionSteps(), getSettings(), getPage("admission-documents")]);
  return (
    <PageShell section="admissions" href="/admissions" intro="Most girls join us in Nursery to Class I. Registration happens online once a year, usually from 1 December to early January.">
      <Admissions steps={steps} registrationUrl={s.registrationUrl} showHead={false} />
      <Block title="Documents required" id="documents" className="!mt-12">
        <RichText html={docs.body} className="max-w-[75ch]" />
      </Block>
    </PageShell>
  );
}
