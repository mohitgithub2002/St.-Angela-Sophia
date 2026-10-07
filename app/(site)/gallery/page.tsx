import type { Metadata } from "next";
import Link from "next/link";
import { Empty, PageShell } from "@/components/page/PageShell";
import { Photo } from "@/components/Photo";
import { getAlbums } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Photo Gallery" };

export default async function Gallery() {
  const albums = await getAlbums();
  return (
    <PageShell section="gallery" href="/gallery" intro="Annual Day, Sports Day, science fairs, celebrations and everyday campus life.">
      {albums.length === 0 && <Empty>Photo albums will appear here.</Empty>}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((a) => (
          <li key={a.id}>
            <Link href={`/gallery/${a.slug}`} className="group block bg-white shadow-[0_2px_10px_rgba(0,0,0,.08)]">
              <Photo src={a.cover} alt={a.title} sizes="(min-width: 1024px) 300px, 50vw" className="aspect-[4/3] [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105" />
              <div className="p-4">
                <h2 className="text-[17px] font-semibold group-hover:text-moss">{a.title}</h2>
                <p className="text-[13px] text-moss/80">{[formatDate(a.date), a.description].filter(Boolean).join(" · ")}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
