import { passPercent } from "@/lib/format";
import type { BoardResult } from "@/lib/types";
import { DataTable } from "./DataTable";
import { Empty } from "./PageShell";

// Board results in the format CBSE prescribes for the Mandatory Public Disclosure.
export function ResultsTable({ results, cls, limit }: { results: BoardResult[]; cls: "X" | "XII"; limit?: number }) {
  const rows = results.filter((r) => r.class === cls).sort((a, b) => b.year.localeCompare(a.year)).slice(0, limit);
  if (!rows.length) return <Empty>Class {cls} board results will be published here.</Empty>;
  return (
    <DataTable
      caption={`Result – Class ${cls}`}
      head={["S.No.", "Year", "No. of Registered Students", "No. of Students Passed", "Pass Percentage", "Remarks"]}
      rows={rows.map((r, i) => [i + 1, r.year, r.registered, r.passed, passPercent(r.registered, r.passed), r.remarks || "—"])}
    />
  );
}
