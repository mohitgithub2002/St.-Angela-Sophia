import { NextResponse, type NextRequest } from "next/server";
import { getStaff } from "@/lib/admin/auth";
import { BOXES, isBox } from "@/lib/admin/inbox";
import { createSessionClient } from "@/lib/supabase/server";

// Downloads an inbox as a CSV file that opens in Excel.
export async function GET(req: NextRequest) {
  if (!(await getStaff())) return new NextResponse("Not signed in", { status: 401 });
  const b = req.nextUrl.searchParams.get("box") ?? "";
  if (!isBox(b)) return new NextResponse("Unknown inbox", { status: 400 });
  const { table, columns } = BOXES[b];
  const db = await createSessionClient();
  const { data, error } = await db.from(table).select(columns.join(",")).order("created_at", { ascending: false });
  if (error) return new NextResponse(error.message, { status: 500 });
  const cell = (v: unknown) => {
    let s = v == null ? "" : typeof v === "object" ? Object.entries(v).filter(([, x]) => x).map(([k, x]) => `${k}: ${x}`).join("; ") : String(v);
    // Stop spreadsheet apps from running text that looks like a formula.
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const rows = ((data ?? []) as unknown as Record<string, unknown>[]).map((r) => columns.map((c) => cell(r[c])).join(","));
  const csv = `﻿${columns.join(",")}\n${rows.join("\n")}`;
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${b}-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
