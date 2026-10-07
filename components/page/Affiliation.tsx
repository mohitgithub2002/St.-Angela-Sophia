import Link from "next/link";
import { getMpdDocuments, getSettings } from "@/lib/content";
import { MPD_HREF } from "@/lib/nav";
import { DataTable } from "./DataTable";
import { FileLink } from "./DocList";

// CBSE affiliation details, shown under both About Us and CBSE Guidelines.
export async function AffiliationDetails() {
  const [s, docs] = await Promise.all([getSettings(), getMpdDocuments()]);
  const letter = docs.affiliation?.file_url;
  const rows: [string, React.ReactNode][] = [
    ["Name of the School", s.name],
    ["Board", s.board],
    ["Affiliation Number", s.affiliation],
    ["School Code", s.schoolCode],
    ["Year of Affiliation", s.affiliationYear],
    ["Affiliation Status", s.affiliationStatus],
    ["Affiliation Valid Up To", s.affiliationValidity],
    ["UDISE Code", s.udise],
    ["Run By", s.society],
    ["Type of School", s.schoolType],
    ["Medium of Instruction", s.medium],
    ["Affiliation Letter", letter ? <FileLink key="l" href={letter} /> : ""],
  ];
  return (
    <>
      <DataTable caption="CBSE affiliation details" head={["Particulars", "Details"]} rows={rows.filter(([, v]) => v).map(([k, v]) => [k, v])} />
      <p className="mt-6 flex flex-wrap gap-3">
        <Link href={MPD_HREF} className="btn">Mandatory Public Disclosure</Link>
        <a href="https://saras.cbse.gov.in/" target="_blank" rel="noopener" className="btn !bg-white !text-moss ring-1 ring-moss ring-inset hover:!bg-moss hover:!text-white">Verify on CBSE SARAS</a>
      </p>
    </>
  );
}
