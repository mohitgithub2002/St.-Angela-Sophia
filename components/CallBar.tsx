import Link from "next/link";
import { MPD_HREF } from "@/lib/nav";
import { telHref } from "@/lib/format";
import { Icon } from "./Icon";

export function CallBar({ phone }: { phone: string }) {
  return (
    <>
      <nav aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-40 flex pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_16px_rgba(0,0,0,.2)] md:hidden">
        <a href={telHref(phone)} className="flex flex-1 items-center justify-center gap-2 bg-white py-3.5 text-[14px] font-medium uppercase text-moss"><Icon name="phone" className="h-4 w-4" />Call School</a>
        <Link href="/contact" className="flex flex-1 items-center justify-center gap-2 bg-moss py-3.5 text-[14px] font-medium uppercase text-white"><Icon name="pen" className="h-4 w-4" />Enquire Now</Link>
      </nav>

      {/* Side tabs and round back-to-top button on larger screens. The disclosure tab keeps CBSE's required link one click away on every page. */}
      <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 md:flex">
        <Link href={MPD_HREF} className="bg-forest px-2.5 py-4 text-[13px] font-medium uppercase tracking-wider text-white shadow-lg [writing-mode:vertical-rl] hover:bg-moss">
          Mandatory Disclosure
        </Link>
        <Link href="/contact" className="bg-moss px-2.5 py-4 text-[13px] font-medium uppercase tracking-wider text-white shadow-lg [writing-mode:vertical-rl] hover:bg-forest">
          Admission Enquiry
        </Link>
      </div>
      <a href="#top" aria-label="Back to top" className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full border-2 border-white bg-moss text-white shadow-[0_0_0_6px_rgba(55,85,52,.25)] transition-colors hover:bg-forest md:grid">
        <Icon name="up" className="h-7 w-7" />
      </a>
    </>
  );
}
