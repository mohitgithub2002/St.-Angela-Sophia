import type { Metadata } from "next";
import { MemberCards } from "@/components/page/Members";
import { Block } from "@/components/page/PageShell";
import { RichPage } from "@/components/page/RichPage";
import { getMembers } from "@/lib/content";

export const metadata: Metadata = { title: "Student Council" };

export default async function StudentCouncil() {
  const members = await getMembers("student_council");
  return (
    <RichPage slug="student-council" section="studentLife" href="/student-life/student-council">
      <Block title="Council members" id="members">
        <MemberCards members={members} empty="This session's Student Council will be listed here after the investiture ceremony." />
      </Block>
    </RichPage>
  );
}
