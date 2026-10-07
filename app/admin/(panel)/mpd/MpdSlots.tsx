"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveMpdSlot } from "@/app/admin/actions";
import { FileUpload } from "@/components/admin/FileUpload";

// One upload per required document. Each saves as soon as the file is uploaded.
export function MpdSlots({ slots, files }: { slots: readonly { slot: string; label: string }[]; files: Record<string, string> }) {
  const router = useRouter();
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState("");
  return (
    <ol className="divide-y divide-lichen/50 bg-white shadow-sm ring-1 ring-lichen/60">
      {slots.map((s, i) => (
        <li key={s.slot} className="grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
          <p className="text-[14.5px]">
            <b className="mr-1 text-forest">{i + 1}.</b>{s.label}
            <span className={`ml-2 inline-block px-2 py-0.5 text-[11px] font-semibold uppercase ${files[s.slot] ? "bg-pista text-forest" : "bg-amber-100 text-amber-900"}`}>{files[s.slot] ? "Uploaded" : "Missing"}</span>
            {saved === s.slot && <span className="ml-2 text-[12.5px] text-moss">Saved ✓</span>}
          </p>
          <FileUpload
            kind="pdf"
            defaultValue={files[s.slot] ?? ""}
            onChange={async (url) => {
              setError("");
              try {
                await saveMpdSlot(s.slot, url);
                setSaved(s.slot);
                router.refresh();
              } catch (e) {
                setError(e instanceof Error ? e.message : "Could not save.");
              }
            }}
          />
        </li>
      ))}
      {error && <li role="alert" className="p-4 text-[14px] text-red-700">{error}</li>}
    </ol>
  );
}
