import type { Metadata } from "next";
import { AffiliationDetails } from "@/components/page/Affiliation";
import { PageShell } from "@/components/page/PageShell";

export const metadata: Metadata = { title: "CBSE Affiliation" };

export default function CbseAffiliation() {
  return (
    <PageShell section="about" href="/about/cbse-affiliation">
      <AffiliationDetails />
    </PageShell>
  );
}
