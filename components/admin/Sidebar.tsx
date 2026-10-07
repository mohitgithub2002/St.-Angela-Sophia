"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, type IconName } from "../Icon";

type Item = { href: string; label: string; icon: IconName; badge?: number };

export function Sidebar({ groups, footer }: { groups: { title: string; items: Item[] }[]; footer: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/admin" ? path === "/admin" : path === href || path.startsWith(`${href}/`));
  return (
    <aside className="bg-forest text-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto">
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/admin" className="font-serif text-[17px] font-semibold">School Admin</Link>
        <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="admin-nav" className="grid h-10 w-10 place-items-center hover:bg-white/10 lg:hidden" aria-label="Menu">
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </div>
      <nav id="admin-nav" aria-label="Admin" className={`${open ? "block" : "hidden"} pb-6 lg:block`}>
        {groups.map((g) => (
          <div key={g.title} className="mt-3">
            <p className="px-5 pb-1 text-[11px] font-semibold uppercase tracking-[.14em] text-lichen/80">{g.title}</p>
            <ul>
              {g.items.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(i.href) ? "page" : undefined}
                    className="flex items-center gap-3 px-5 py-2 text-[14px] text-white/85 hover:bg-white/10 hover:text-white aria-[current=page]:bg-moss aria-[current=page]:text-white"
                  >
                    <Icon name={i.icon} className="h-[18px] w-[18px] shrink-0 text-lichen" />
                    <span className="flex-1">{i.label}</span>
                    {i.badge ? <span className="rounded-full bg-pista px-2 text-[12px] font-semibold text-forest">{i.badge}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="mt-6 border-t border-white/15 px-5 pt-4">{footer}</div>
      </nav>
    </aside>
  );
}
