import type { Metadata } from "next";
import { AffiliationDetails } from "@/components/page/Affiliation";
import { PageShell } from "@/components/page/PageShell";

export const metadata: Metadata = { title: "Affiliation Details" };

export default function Affiliation() {
  return (
    <PageShell section="cbse" href="/cbse/affiliation" intro="The school is affiliated to the Central Board of Secondary Education, New Delhi, up to the Senior Secondary level.">
      <AffiliationDetails />
    </PageShell>
  );
}
