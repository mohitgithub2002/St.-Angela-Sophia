"use client";
import Link from "next/link";
import { startTransition, useActionState } from "react";
import type { Field, FormResult } from "@/lib/admin/fields";
import { FileUpload } from "./FileUpload";
import { RichTextEditor } from "./RichTextEditor";

export const inputCls = "w-full border border-lichen bg-white px-3 py-2.5 text-[15px] text-forest focus:border-moss focus:outline-none focus:ring-2 focus:ring-lichen/60";

function FieldInput({ f, value }: { f: Field; value: unknown }) {
  const str = value == null ? "" : String(value);
  switch (f.type) {
    case "textarea":
      return <textarea name={f.name} defaultValue={str} required={f.required} placeholder={f.placeholder} rows={4} className={inputCls} />;
    case "richtext":
      return <RichTextEditor name={f.name} defaultValue={str} />;
    case "number":
      return <input type="number" name={f.name} defaultValue={str} required={f.required} min={0} step="any" className={inputCls} />;
    case "date":
      return <input type="date" name={f.name} defaultValue={str.slice(0, 10)} required={f.required} className={inputCls} />;
    case "select":
    case "icon":
      return (
        <select name={f.name} defaultValue={str} required={f.required} className={inputCls}>
          {!f.required && f.type === "select" && <option value="">—</option>}
          {f.options?.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      );
    case "checkbox":
      return null;
    case "image":
    case "pdf":
      return <FileUpload name={f.name} kind={f.type} defaultValue={str} required={f.required} />;
    case "list":
      return <textarea name={f.name} defaultValue={Array.isArray(value) ? value.join("\n") : str} rows={5} placeholder="One per line" className={inputCls} />;
    case "url":
      return <input type="text" inputMode="url" name={f.name} defaultValue={str} required={f.required} placeholder={f.placeholder} className={inputCls} />;
    default:
      return <input type="text" name={f.name} defaultValue={str} required={f.required} placeholder={f.placeholder} className={inputCls} />;
  }
}

export function FieldGrid({ fields, values }: { fields: Field[]; values: Record<string, unknown> }) {
  return (
    <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
      {fields.map((f) =>
        f.type === "checkbox" ? (
          <label key={f.name} className="flex items-center gap-3 text-[14.5px] font-medium text-forest sm:col-span-2">
            <input type="checkbox" name={f.name} defaultChecked={Boolean(values[f.name])} className="h-5 w-5 accent-moss" />
            {f.label}
          </label>
        ) : (
          <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
            <label className="mb-1.5 block text-[14px] font-medium text-forest">
              {f.label}{f.required && <span className="text-red-700"> *</span>}
            </label>
            <FieldInput f={f} value={values[f.name]} />
            {f.help && <p className="mt-1 text-[12.5px] text-moss/80">{f.help}</p>}
          </div>
        ),
      )}
    </div>
  );
}

// A form built from a field list, posted to a Server Action that redirects on success or returns an error.
export function FieldsForm({
  fields,
  groups,
  values,
  action,
  submit = "Save",
  cancel,
  back,
  children,
}: {
  fields?: Field[];
  groups?: { title: string; fields: Field[] }[];
  values: Record<string, unknown>;
  action: (state: FormResult, fd: FormData) => Promise<FormResult>;
  submit?: string;
  cancel?: string;
  back?: string;
  children?: React.ReactNode;
}) {
  const [state, run, pending] = useActionState(action, null);
  return (
    // Submitting through onSubmit (not the action prop) stops React from clearing the form when the save fails.
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => run(fd));
      }}
      className="space-y-6"
    >
      {back && <input type="hidden" name="_back" value={back} />}
      {fields && <div className="bg-white p-5 shadow-sm ring-1 ring-lichen/60 sm:p-6"><FieldGrid fields={fields} values={values} /></div>}
      {groups?.map((g) => (
        <fieldset key={g.title} className="bg-white p-5 shadow-sm ring-1 ring-lichen/60 sm:p-6">
          <legend className="float-left mb-4 w-full font-serif text-[18px] font-semibold text-forest">{g.title}</legend>
          <div className="clear-both"><FieldGrid fields={g.fields} values={values} /></div>
        </fieldset>
      ))}
      {children}
      <div className="sticky bottom-0 -mx-1 flex flex-wrap items-center gap-3 bg-[#f6f8f3]/95 px-1 py-3 backdrop-blur">
        <button type="submit" disabled={pending} className="btn disabled:opacity-60">{pending ? "Saving…" : submit}</button>
        {cancel && <Link href={cancel} className="px-3 py-2 text-[14px] text-moss hover:underline">Cancel</Link>}
        {state && !state.ok && <p role="alert" className="text-[14px] font-medium text-red-700">{state.message}</p>}
      </div>
    </form>
  );
}
