import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Empty } from "@/components/page/PageShell";
import { RichPage } from "@/components/page/RichPage";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Parent Portal" };

export default async function Portal() {
  const s = await getSettings();
  return (
    <RichPage slug="parent-portal" section="parents" href="/parents/portal">
      {s.parentPortalUrl ? (
        <div className="flex flex-col items-start gap-5 border-l-4 border-moss bg-mint p-6 sm:flex-row sm:items-center">
          <Icon name="user" className="h-12 w-12 shrink-0 text-moss" />
          <p className="flex-1">Sign in with the username and password given to you by the school to see attendance, marks, homework and fee details.</p>
          <a href={s.parentPortalUrl} target="_blank" rel="noopener" className="btn shrink-0">Parent login</a>
        </div>
      ) : (
        <Empty>The parent portal link will be available here soon.</Empty>
      )}
    </RichPage>
  );
}
