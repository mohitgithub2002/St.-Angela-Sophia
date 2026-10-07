import Link from "next/link";
import { sections } from "@/lib/nav";
import { Icon } from "../Icon";

// Layout for every inner page: green banner with breadcrumb, the section's sub-pages in a side menu, then the content.
export function PageShell({
  section,
  href,
  title,
  intro,
  children,
}: {
  section: keyof typeof sections;
  href: string;
  title?: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  const s = sections[section];
  const heading = title ?? s.children.find((c) => c.href === href)?.label ?? s.label;
  const subnav = s.children.length > 1 ? s.children : [];
  return (
    <>
      <div className="relative overflow-hidden bg-forest py-[clamp(36px,6vw,64px)] text-white">
        <div className="absolute inset-0 opacity-[.07] [background-image:repeating-linear-gradient(135deg,#fff_0_2px,transparent_2px_14px)]" aria-hidden="true" />
        <div className="wrap relative">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-lichen">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              {s.href !== href && heading !== s.label && (
                <li className="flex items-center gap-1.5"><Icon name="right" className="h-3 w-3" /><Link href={s.href} className="hover:text-white">{s.label}</Link></li>
              )}
              <li className="flex items-center gap-1.5"><Icon name="right" className="h-3 w-3" /><span aria-current="page" className="text-white">{heading}</span></li>
            </ol>
          </nav>
          <h1 className="mt-3 text-[clamp(28px,4vw,44px)] font-bold uppercase leading-tight !text-white">{heading}</h1>
          {intro && <p className="mt-3 max-w-[70ch] text-white/85">{intro}</p>}
        </div>
      </div>

      <div className={`wrap grid gap-10 py-12 ${subnav.length ? "lg:grid-cols-[250px_minmax(0,1fr)]" : ""}`}>
        {subnav.length > 0 && (
          <aside className="lg:order-none">
            <nav aria-label={`${s.label} pages`} className="lg:sticky lg:top-[110px]">
              <h2 className="hidden bg-moss px-5 py-3 text-[15px] font-semibold uppercase !text-white lg:block">{s.label}</h2>
              <ul className="flex flex-wrap gap-2 lg:block lg:border lg:border-t-0 lg:border-lichen/60">
                {subnav.map((c) => {
                  const current = c.href === href;
                  return (
                    <li key={c.href + c.label} className="lg:border-t lg:border-lichen/40 lg:first:border-t-0">
                      <Link
                        href={c.href}
                        aria-current={current ? "page" : undefined}
                        className="flex items-center gap-2 border border-lichen px-3.5 py-2 text-[14px] text-moss transition-colors hover:bg-mint hover:text-forest aria-[current=page]:border-moss aria-[current=page]:bg-moss aria-[current=page]:text-white lg:border-0 lg:px-5 lg:py-3 lg:aria-[current=page]:bg-mint lg:aria-[current=page]:font-semibold lg:aria-[current=page]:text-forest"
                      >
                        <Icon name="right" className="hidden h-3.5 w-3.5 shrink-0 text-sage lg:block" />
                        {c.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        )}
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}

// Heading for a block inside a page.
export function Block({ title, id, children, className = "" }: { title?: string; id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={id && title ? `${id}-h` : undefined} className={`mt-12 first:mt-0 ${className}`}>
      {title && (
        <>
          <h2 id={id ? `${id}-h` : undefined} className="text-[clamp(20px,2.2vw,24px)] font-bold uppercase">{title}</h2>
          <span className="mb-5 mt-3 block h-[3px] w-6 bg-moss" aria-hidden="true" />
        </>
      )}
      {children}
    </section>
  );
}

// Shown wherever the school hasn't published something yet.
export function Empty({ children = "This information will be published here soon. For details, please contact the school office." }: { children?: React.ReactNode }) {
  return (
    <p className="flex items-start gap-3 border border-dashed border-lichen bg-mint px-5 py-4 text-[14.5px]">
      <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-sage" />
      <span>{children}</span>
    </p>
  );
}
