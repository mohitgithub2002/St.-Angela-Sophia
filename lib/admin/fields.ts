// Field definitions shared by the admin forms (client) and the save actions (server). Plain data only.

export type FieldType =
  | "text" | "textarea" | "richtext" | "number" | "date" | "select" | "checkbox" | "image" | "pdf" | "list" | "url" | "icon";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: [string, string][];
  help?: string;
  placeholder?: string;
  half?: boolean;
};

export type FormResult = { ok: false; message: string } | null;

// Turns submitted form data into a database row, following the field list. Returns an error message on bad input.
export function parseFields(fields: Field[], fd: FormData): { row: Record<string, unknown> } | { error: string } {
  const row: Record<string, unknown> = {};
  for (const f of fields) {
    const raw = String(fd.get(f.name) ?? "").trim();
    if (f.type === "checkbox") {
      row[f.name] = fd.get(f.name) === "on";
      continue;
    }
    if (f.required && !raw && !(f.type === "richtext" && raw === "<p></p>")) return { error: `${f.label} is required.` };
    switch (f.type) {
      case "number": {
        const n = raw === "" ? 0 : Number(raw);
        if (!Number.isFinite(n) || n < 0) return { error: `${f.label} must be a number.` };
        row[f.name] = n;
        break;
      }
      case "date":
        if (raw && !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return { error: `${f.label} must be a date.` };
        row[f.name] = raw || null;
        break;
      case "list":
        row[f.name] = raw.split(/\n|,/).map((x) => x.trim()).filter(Boolean);
        break;
      case "select":
        if (f.options && raw && !f.options.some(([v]) => v === raw)) return { error: `Choose a valid ${f.label.toLowerCase()}.` };
        row[f.name] = raw;
        break;
      case "url":
        if (raw && !/^(https?:\/\/|\/|mailto:|tel:)/.test(raw)) return { error: `${f.label} must start with https:// or /.` };
        row[f.name] = raw;
        break;
      default:
        row[f.name] = raw;
    }
  }
  return { row };
}
