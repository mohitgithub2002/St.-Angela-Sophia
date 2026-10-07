import type { Metadata } from "next";
import { DocList } from "@/components/page/DocList";
import { FeeTables } from "@/components/page/Fees";
import { Block, PageShell } from "@/components/page/PageShell";
import { getDocuments, getFees } from "@/lib/content";

export const metadata: Metadata = { title: "Fee Structure" };

export default async function FeeStructure() {
  const [fees, docs] = await Promise.all([getFees(), getDocuments(["fee"])]);
  return (
    <PageShell section="admissions" href="/admissions/fee-structure" intro="Tuition, transport and other charges for each class. Fees are paid at the school office or through the parent portal.">
      <FeeTables fees={fees} />
      {docs.length > 0 && <Block title="Fee circulars" id="fee-docs" className="mt-12"><DocList docs={docs} /></Block>}
    </PageShell>
  );
}
