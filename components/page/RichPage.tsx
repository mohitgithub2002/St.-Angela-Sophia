import { getPage } from "@/lib/content";
import type { sections } from "@/lib/nav";
import { Photo } from "../Photo";
import { RichText } from "../RichText";
import { PageShell } from "./PageShell";

// An inner page whose main text is edited in Admin › Pages. Extra blocks go in children.
export async function RichPage({
  slug,
  section,
  href,
  title,
  image,
  children,
}: {
  slug: string;
  section: keyof typeof sections;
  href: string;
  title?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  const page = await getPage(slug);
  const photo = page.image || image;
  return (
    <PageShell section={section} href={href} title={title}>
      <div className={photo ? "grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,.8fr)]" : ""}>
        <RichText html={page.body} className="max-w-[75ch]" />
        {photo && <Photo src={photo} alt={page.title} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/3] w-full shadow-[0_2px_10px_rgba(0,0,0,.1)]" />}
      </div>
      {children && <div className="mt-12">{children}</div>}
    </PageShell>
  );
}
