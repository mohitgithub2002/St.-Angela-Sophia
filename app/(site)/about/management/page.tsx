import type { Metadata } from "next";
import { MemberCards } from "@/components/page/Members";
import { PageShell } from "@/components/page/PageShell";
import { getMembers, getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Management Team" };

export default async function Management() {
  const [members, s] = await Promise.all([getMembers("management"), getSettings()]);
  return (
    <PageShell section="about" href="/about/management" intro={`The school is run by the ${s.society}. Its governing body and managing committee are listed below.`}>
      <MemberCards members={members} empty="Details of the managing committee will be published here." />
    </PageShell>
  );
}
