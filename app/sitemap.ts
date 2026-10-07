import type { MetadataRoute } from "next";
import { getAlbums } from "@/lib/content";
import { sections } from "@/lib/nav";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = new Set(["/", ...Object.values(sections).flatMap((s) => [s.href, ...s.children.map((c) => c.href)])]);
  for (const a of await getAlbums()) paths.add(`/gallery/${a.slug}`);
  return [...paths].map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly", priority: p === "/" || p === "/mandatory-public-disclosure" ? 1 : 0.6 }));
}
