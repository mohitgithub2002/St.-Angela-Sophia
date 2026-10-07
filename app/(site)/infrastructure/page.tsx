import type { Metadata } from "next";
import Link from "next/link";
import { FacilityCards } from "@/components/Facilities";
import { Icon } from "@/components/Icon";
import { Block } from "@/components/page/PageShell";
import { RichPage } from "@/components/page/RichPage";
import { getFacilities } from "@/lib/content";
import { sections } from "@/lib/nav";

export const metadata: Metadata = { title: "School Infrastructure" };

export default async function Infrastructure() {
  const facilities = await getFacilities();
  return (
    <RichPage slug="infrastructure" section="infrastructure" href="/infrastructure" title="School Infrastructure">
      <Block title="Facilities at a glance" id="facilities">
        <FacilityCards facilities={facilities} />
      </Block>
      <Block title="Explore" id="explore">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.infrastructure.children.slice(1).map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="flex items-center justify-between border border-lichen bg-white px-5 py-4 font-medium text-forest hover:border-moss hover:bg-mint">
                {c.label}<Icon name="arrow" className="h-5 w-5 text-sage" />
              </Link>
            </li>
          ))}
        </ul>
      </Block>
    </RichPage>
  );
}
