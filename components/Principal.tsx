import Link from "next/link";
import type { Page } from "@/lib/types";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { RichText } from "./RichText";

export function Principal({ page, name }: { page: Page; name: string }) {
  return (
    <section id="principal" aria-labelledby="principal-title" className="relative overflow-hidden bg-mint py-16">
      <div className="wrap grid items-stretch gap-0 md:grid-cols-[1.25fr_.75fr] lg:grid-cols-[1.4fr_.6fr]">
        <div className="flex flex-col justify-center bg-white px-[clamp(24px,4vw,56px)] py-10 shadow-[0_2px_10px_rgba(0,0,0,.06)]">
          <h2 id="principal-title" className="title">Message from <span className="text-sage">the Principal</span></h2>
          <span className="mt-4 block h-[3px] w-6 bg-moss" aria-hidden="true" />
          <RichText html={page.body} className="mt-6 text-[15px] leading-[1.75]" />
          <p className="mt-6 font-semibold text-moss">{name}<small className="block text-[13px] font-normal text-forest/70">Principal, St. Angela Sophia Sr. Sec. School</small></p>
          <Link href="/about/principal-message" className="btn group mt-6 inline-flex w-fit items-center gap-2">
            Read More <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <Photo src={page.image || "principal.jpg"} alt={`${name}, Principal`} sizes="(min-width: 768px) 35vw, 100vw" className="min-h-[380px] w-full" position="55% 30%" />
      </div>
    </section>
  );
}
