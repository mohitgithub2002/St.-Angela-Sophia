import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FacilityCards } from "@/components/Facilities";
import { DataTable } from "@/components/page/DataTable";
import { Block, Empty } from "@/components/page/PageShell";
import { RichPage } from "@/components/page/RichPage";
import { getFacilities, getTransportRoutes } from "@/lib/content";
import { FACILITY_CATEGORIES, type FacilityCategory } from "@/lib/types";

const SLUGS = ["classrooms", "library", "laboratories", "sports", "transport", "canteen"] as const;
type Slug = (typeof SLUGS)[number];
const isSlug = (s: string): s is Slug => (SLUGS as readonly string[]).includes(s);

export const generateStaticParams = () => SLUGS.map((slug) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: isSlug(slug) ? FACILITY_CATEGORIES[slug as FacilityCategory] : "Infrastructure" };
}

export default async function Facility({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();
  const [facilities, routes] = await Promise.all([getFacilities(slug), slug === "transport" ? getTransportRoutes() : Promise.resolve([])]);
  return (
    <RichPage slug={`infra-${slug}`} section="infrastructure" href={`/infrastructure/${slug}`}>
      {facilities.length > 0 && <Block title="Highlights" id="highlights"><FacilityCards facilities={facilities} /></Block>}
      {slug === "transport" && (
        <Block title="Bus routes" id="routes">
          {routes.length ? (
            <DataTable caption="Bus routes" head={["Route", "Areas covered", "Contact"]} rows={routes.map((r) => [r.route_no, r.areas, r.contact || "—"])} />
          ) : (
            <Empty>Route details will be published here. Please contact the school office for transport enquiries.</Empty>
          )}
        </Block>
      )}
    </RichPage>
  );
}
