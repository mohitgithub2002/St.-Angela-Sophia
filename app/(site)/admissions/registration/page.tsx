import type { Metadata } from "next";
import { DocList } from "@/components/page/DocList";
import { Block, PageShell } from "@/components/page/PageShell";
import { Icon } from "@/components/Icon";
import { getDocuments, getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Registration Forms" };

export default async function Registration() {
  const [s, forms] = await Promise.all([getSettings(), getDocuments(["form"])]);
  return (
    <PageShell section="admissions" href="/admissions/registration" intro="Register online when the window opens, or download a form and submit it at the school office.">
      <Block title="Online registration" id="online">
        <div className="flex flex-col items-start gap-5 border-l-4 border-moss bg-mint p-6 sm:flex-row sm:items-center">
          <Icon name="screen" className="h-12 w-12 shrink-0 text-moss" />
          <p className="flex-1">Fill in the registration form online. Keep a parent&apos;s Aadhaar number, a mobile number and your daughter&apos;s birth certificate ready.</p>
          <a href={s.registrationUrl} target="_blank" rel="noopener" className="btn shrink-0">Register online</a>
        </div>
      </Block>
      <Block title="Downloadable forms" id="forms">
        <DocList docs={forms} empty="Downloadable admission forms will be available here when registration opens." />
      </Block>
    </PageShell>
  );
}
