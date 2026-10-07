import type { Member } from "@/lib/types";
import { Photo } from "../Photo";
import { Icon } from "../Icon";
import { DataTable } from "./DataTable";
import { Empty } from "./PageShell";

export function MemberCards({ members, empty }: { members: Member[]; empty?: React.ReactNode }) {
  if (!members.length) return <Empty>{empty}</Empty>;
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => (
        <li key={m.id} className="bg-white text-center shadow-[0_2px_10px_rgba(0,0,0,.08)]">
          {m.photo ? (
            <Photo src={m.photo} alt={m.name} sizes="(min-width: 1024px) 280px, 50vw" className="aspect-[4/3.4]" position="center 25%" />
          ) : (
            <div className="grid aspect-[4/2] place-items-center bg-gradient-to-br from-sage to-forest text-white/80"><Icon name="user" className="h-16 w-16" /></div>
          )}
          <div className="px-4 py-5">
            <h3 className="text-[17px] font-semibold">{m.name}</h3>
            {m.designation && <p className="text-[14px] font-medium text-sage">{m.designation}</p>}
            {m.representing && <p className="mt-1 text-[13.5px]">{m.representing}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

// The SMC and PTA lists in the disclosure use a plain table.
export function MemberTable({ members, caption, empty }: { members: Member[]; caption: string; empty?: React.ReactNode }) {
  if (!members.length) return <Empty>{empty ?? `The ${caption} list will be published here.`}</Empty>;
  return (
    <DataTable caption={caption} head={["S.No.", "Name", "Designation", "Representing"]} rows={members.map((m, i) => [i + 1, m.name, m.designation || "—", m.representing || "—"])} />
  );
}
