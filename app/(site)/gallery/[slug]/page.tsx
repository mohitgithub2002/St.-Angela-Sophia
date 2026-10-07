import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lightbox } from "@/components/Lightbox";
import { Empty, PageShell } from "@/components/page/PageShell";
import { getAlbum, getAlbums } from "@/lib/content";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  return (await getAlbums()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const found = await getAlbum((await params).slug);
  return { title: found ? `${found.album.title} – Gallery` : "Gallery" };
}

export default async function Album({ params }: { params: Promise<{ slug: string }> }) {
  const found = await getAlbum((await params).slug);
  if (!found) notFound();
  const { album, photos } = found;
  return (
    <PageShell section="gallery" href="/gallery" title={album.title} intro={[formatDate(album.date), album.description].filter(Boolean).join(" · ") || undefined}>
      {photos.length ? <Lightbox photos={photos.map((p) => ({ id: p.id, src: p.image, caption: p.caption }))} /> : <Empty>Photos will be added soon.</Empty>}
    </PageShell>
  );
}
