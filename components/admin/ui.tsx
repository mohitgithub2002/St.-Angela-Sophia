import Link from "next/link";
import { Icon } from "../Icon";

// Small building blocks for admin pages.

export function AdminHeader({ title, intro, actions, back }: { title: string; intro?: React.ReactNode; actions?: React.ReactNode; back?: { href: string; label: string } }) {
  return (
    <div className="mb-6">
      {back && <Link href={back.href} className="mb-2 inline-flex items-center gap-1 text-[13px] text-moss hover:underline"><Icon name="left" className="h-3.5 w-3.5" />{back.label}</Link>}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <h1 className="text-[clamp(22px,3vw,28px)] font-bold">{title}</h1>
          {intro && <p className="mt-1 max-w-[75ch] text-[14.5px] text-moss">{intro}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export function Notice({ children, tone = "ok" }: { children: React.ReactNode; tone?: "ok" | "warn" }) {
  return (
    <p role="status" className={`mb-5 flex items-center gap-2 border-l-4 px-4 py-3 text-[14px] ${tone === "ok" ? "border-moss bg-pista text-forest" : "border-amber-600 bg-amber-50 text-amber-900"}`}>
      <Icon name={tone === "ok" ? "check" : "info"} className="h-5 w-5 shrink-0" />{children}
    </p>
  );
}

export const smallBtn = "inline-flex items-center gap-1.5 border border-lichen bg-white px-3 py-1.5 text-[13px] font-medium text-moss hover:border-moss hover:bg-mint";
export const dangerBtn = "inline-flex items-center gap-1.5 border border-red-200 bg-white px-3 py-1.5 text-[13px] font-medium text-red-700 hover:bg-red-50";
