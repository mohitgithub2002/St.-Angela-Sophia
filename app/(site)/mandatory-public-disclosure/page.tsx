import type { Metadata } from "next";
import Link from "next/link";
import { DataTable } from "@/components/page/DataTable";
import { FileLink } from "@/components/page/DocList";
import { MemberTable } from "@/components/page/Members";
import { Block } from "@/components/page/PageShell";
import { PageShell } from "@/components/page/PageShell";
import { ResultsTable } from "@/components/page/Results";
import * as c from "@/lib/content";
import { MPD_SLOTS } from "@/lib/data";
import { MPD_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Mandatory Public Disclosure",
  description: "Mandatory Public Disclosure as per Appendix IX of the CBSE Affiliation Bye-Laws 2018.",
};

const pending = <span className="text-[13px] text-moss/70">To be uploaded</span>;
const dash = (v: string) => v || "—";

function Link2({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="font-medium text-moss underline underline-offset-2 hover:text-forest">{children}</Link>;
}

// Follows the format in Appendix IX (CBSE circular dated 05.03.2021), sections A to E.
export default async function MandatoryDisclosure() {
  const [s, mpd, slots, fees, calendarDocs, smc, pta, results, feeDocs] = await Promise.all([
    c.getSettings(), c.getMpdInfo(), c.getMpdDocuments(), c.getFees(), c.getDocuments(["calendar"]), c.getMembers("smc"), c.getMembers("pta"), c.getResults(), c.getDocuments(["fee"]),
  ]);
  const feePdf = feeDocs.find((d) => d.file_url);
  const calendarPdf = calendarDocs.find((d) => d.file_url);
  const updated = [...Object.values(slots)].map((x) => x?.updated_at ?? "").sort().pop();

  return (
    <PageShell
      section="cbse"
      href={MPD_HREF}
      title="Mandatory Public Disclosure"
      intro="Information disclosed under Clause 2.4.9 of the CBSE Affiliation Bye-Laws 2018, in the format prescribed in Appendix IX (CBSE circulars dated 05.03.2021 and 21.05.2021)."
    >
      <Block title="A. General Information" id="general">
        <DataTable
          caption="General information"
          head={["S.No.", "Information", "Details"]}
          rows={[
            ["Name of the School", s.name],
            ["Affiliation No. (if applicable)", dash(s.affiliation)],
            ["School Code (if applicable)", dash(s.schoolCode)],
            ["Complete Address with Pin Code", `${s.address} – ${s.pin}`],
            ["Principal Name & Qualification", [s.principalName, s.principalQualification].filter(Boolean).join(", ")],
            ["School Email ID", <a key="e" href={`mailto:${s.email}`} className="text-moss underline">{s.email}</a>],
            ["Contact Details (Landline/Mobile)", [s.phone, s.mobile].filter(Boolean).join(" / ")],
          ].map((r, i) => [i + 1, ...r])}
        />
      </Block>

      <Block title="B. Documents and Information" id="documents">
        <DataTable
          caption="Documents and information"
          head={["S.No.", "Documents / Information", "Link"]}
          rows={MPD_SLOTS.map((d, i) => [i + 1, d.label, slots[d.slot]?.file_url ? <FileLink href={slots[d.slot]!.file_url} /> : pending])}
        />
        <p className="mt-4 border-l-4 border-sage bg-mint px-4 py-3 text-[14px]">
          <b className="text-forest">Note:</b> The school needs to upload the self-attested copies of the above listed documents by the Chairman/Manager/Secretary and Principal. In case it is noticed at a later stage that the uploaded documents are not genuine, the school shall be liable for action as per norms.
        </p>
      </Block>

      <Block title="C. Result and Academics" id="academics">
        <DataTable
          caption="Result and academics"
          head={["S.No.", "Documents / Information", "Link"]}
          rows={[
            ["Fee Structure of the School", feePdf ? <FileLink href={feePdf.file_url} /> : fees.length ? <Link2 href="/admissions/fee-structure">View fee structure</Link2> : pending],
            ["Annual Academic Calendar", calendarPdf ? <FileLink href={calendarPdf.file_url} /> : <Link2 href="/academic-calendar">View academic calendar</Link2>],
            ["List of School Management Committee (SMC)", smc.length ? <Link2 href="#smc">View list</Link2> : pending],
            ["List of Parents Teachers Association (PTA) Members", pta.length ? <Link2 href="#pta">View list</Link2> : pending],
            ["Last three-year result of the Board Examination as per applicability", <Link2 key="r" href="#results">View results</Link2>],
          ].map((r, i) => [i + 1, ...r])}
        />

        <div id="results" className="mt-8 scroll-mt-28">
          <h3 className="mb-3 text-[18px] font-semibold uppercase">Result – Class X</h3>
          <ResultsTable results={results} cls="X" limit={3} />
          <h3 className="mb-3 mt-8 text-[18px] font-semibold uppercase">Result – Class XII</h3>
          <ResultsTable results={results} cls="XII" limit={3} />
        </div>

        <div id="smc" className="mt-8 scroll-mt-28">
          <h3 className="mb-3 text-[18px] font-semibold uppercase">School Management Committee (SMC)</h3>
          <MemberTable members={smc} caption="School Management Committee" />
        </div>
        <div id="pta" className="mt-8 scroll-mt-28">
          <h3 className="mb-3 text-[18px] font-semibold uppercase">Parents Teachers Association (PTA)</h3>
          <MemberTable members={pta} caption="Parents Teachers Association" />
        </div>
      </Block>

      <Block title="D. Staff (Teaching)" id="staff">
        <DataTable
          caption="Teaching staff"
          head={["S.No.", "Information", "Details"]}
          rows={[
            ["Principal", [s.principalName, s.principalQualification].filter(Boolean).join(", ")],
            ["Total No. of Teachers", dash(mpd.totalTeachers)],
            ["PGT", dash(mpd.pgt)],
            ["TGT", dash(mpd.tgt)],
            ["PRT", dash(mpd.prt)],
            ["Teachers Section Ratio", dash(mpd.teacherSectionRatio)],
            ["Details of Special Educator", dash(mpd.specialEducator)],
            ["Details of Counsellor and Wellness Teacher", dash(mpd.counsellor)],
          ].map((r, i) => [["1", "2", "", "", "", "3", "4", "5"][i], ...r])}
        />
      </Block>

      <Block title="E. School Infrastructure" id="infrastructure">
        <DataTable
          caption="School infrastructure"
          head={["S.No.", "Information", "Details"]}
          rows={[
            ["Total Campus Area of the School (in square metres)", dash(mpd.campusArea)],
            ["No. and Size of the Class Rooms (in square metres)", dash(mpd.classrooms)],
            ["No. and Size of Laboratories including Computer Labs (in square metres)", dash(mpd.laboratories)],
            ["Internet Facility (Y/N)", dash(mpd.internet)],
            ["No. of Girls Toilets", dash(mpd.girlsToilets)],
            ["No. of Boys Toilets", dash(mpd.boysToilets)],
            [
              "Link of YouTube video of the inspection of school covering the infrastructure of the school",
              mpd.inspectionVideo ? <a key="v" href={mpd.inspectionVideo} target="_blank" rel="noopener" className="break-all text-moss underline">{mpd.inspectionVideo}</a> : pending,
            ],
          ].map((r, i) => [i + 1, ...r])}
        />
      </Block>

      {updated && <p className="mt-10 text-[13px] text-moss/80">Documents last updated on {new Date(updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.</p>}
    </PageShell>
  );
}
