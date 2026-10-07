import { rupees } from "@/lib/format";
import type { Fee } from "@/lib/types";
import { DataTable } from "./DataTable";
import { Empty } from "./PageShell";

// One table per session: classes down the side, fee heads across the top.
export function FeeTables({ fees, latestOnly = false }: { fees: Fee[]; latestOnly?: boolean }) {
  const sessions = [...new Set(fees.map((f) => f.session))].sort().reverse();
  if (!sessions.length) return <Empty>The fee structure for the current session will be published here. Please contact the school office for details.</Empty>;
  return (
    <div className="space-y-8">
      {(latestOnly ? sessions.slice(0, 1) : sessions).map((session) => {
        const list = fees.filter((f) => f.session === session).sort((a, b) => a.sort - b.sort);
        const heads = [...new Set(list.map((f) => f.fee_head))];
        const classes = [...new Set(list.map((f) => f.class_group))];
        return (
          <div key={session}>
            <h3 className="mb-3 text-[18px] font-semibold">Session {session}</h3>
            <DataTable
              caption={`Fee structure ${session}`}
              head={["Class", ...heads]}
              rows={classes.map((c) => [
                c,
                ...heads.map((h) => {
                  const f = list.find((x) => x.class_group === c && x.fee_head === h);
                  return f ? <>{rupees(f.amount)}<small className="block text-[12px] text-moss/80">{f.frequency}</small></> : "—";
                }),
              ])}
            />
          </div>
        );
      })}
    </div>
  );
}
