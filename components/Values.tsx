import type { CoreValue } from "@/lib/types";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";

export function Values({ values }: { values: CoreValue[] }) {
  return (
    <section id="values" aria-labelledby="values-title" className="py-16">
      <div className="wrap">
        <SectionHead id="values-title" title="The Values We Live By">
          Sophia means wisdom. It&apos;s the thread through everything we teach, and the reason families have trusted us for a century.
        </SectionHead>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.id} className="group flex gap-5">
              <span className="grid h-[70px] w-[70px] shrink-0 place-items-center rounded-full border-2 border-moss text-moss transition-colors group-hover:bg-moss group-hover:text-white">
                <Icon name={v.icon} className="h-8 w-8" />
              </span>
              <div>
                <h3 className="text-[19px]">{v.title}</h3>
                <p className="mt-1">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
