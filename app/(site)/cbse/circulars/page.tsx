import type { Metadata } from "next";
import { DocList } from "@/components/page/DocList";
import { Block, PageShell } from "@/components/page/PageShell";
import { getDocuments } from "@/lib/content";

export const metadata: Metadata = { title: "CBSE Circulars & Notifications" };

export default async function CbseCirculars() {
  const docs = await getDocuments(["cbse_circular"]);
  return (
    <PageShell section="cbse" href="/cbse/circulars" intro="The latest CBSE circulars on examinations, curriculum and policy that concern our students and parents.">
      <DocList docs={docs} empty="CBSE circulars will be posted here." />
      <Block title="Official sources" id="official" className="mt-12">
        <ul className="rich">
          <li><a href="https://www.cbse.gov.in" target="_blank" rel="noopener">CBSE official website</a></li>
          <li><a href="https://cbseacademic.nic.in" target="_blank" rel="noopener">CBSE Academic (curriculum and circulars)</a></li>
        </ul>
      </Block>
    </PageShell>
  );
}
