"use client";
import { useRef, useState } from "react";
import { imageUrl } from "../Photo";
import { Icon } from "../Icon";
import { acceptFor, hintFor, uploadFile, type UploadKind } from "./upload";

// File field for admin forms. Uploads on selection and keeps the resulting URL in a hidden input called `name`.
// Pass onChange to react to uploads instead of (or as well as) submitting a form.
export function FileUpload({
  name,
  kind,
  defaultValue = "",
  required,
  onChange,
}: {
  name?: string;
  kind: UploadKind;
  defaultValue?: string;
  required?: boolean;
  onChange?: (url: string) => void | Promise<void>;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  async function pick(file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const u = await uploadFile(file, kind);
      setUrl(u);
      await onChange?.(u);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  async function clear() {
    setUrl("");
    await onChange?.("");
  }

  return (
    <div className="flex flex-col gap-2">
      {name && <input type="hidden" name={name} value={url} />}
      {url && (
        <div className="flex flex-wrap items-center gap-3 border border-lichen bg-mint p-2">
          {kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl(url)} alt="" className="h-20 w-28 bg-white object-cover" />
          ) : (
            <Icon name="file" className="h-10 w-10 text-moss" />
          )}
          <a href={imageUrl(url)} target="_blank" rel="noopener" className="min-w-0 flex-1 truncate text-[13px] text-moss underline">{decodeURIComponent(url.split("/").pop() ?? url)}</a>
          <button type="button" onClick={clear} className="text-[13px] font-medium text-red-700 hover:underline">Remove</button>
        </div>
      )}
      <label className={`flex cursor-pointer items-center gap-2 border border-dashed border-sage bg-white px-4 py-3 text-[14px] text-moss hover:bg-mint ${busy ? "opacity-60" : ""}`}>
        <Icon name="upload" className="h-5 w-5" />
        {busy ? "Uploading…" : url ? "Replace file" : "Choose file"}
        <span className="text-[12.5px] text-moss/70">({hintFor(kind)})</span>
        <input
          ref={input}
          type="file"
          accept={acceptFor(kind)}
          disabled={busy}
          className="sr-only"
          onChange={(e) => pick(e.target.files?.[0])}
          // Lets the browser block submitting the form while a required file is missing.
          required={required && !url}
        />
      </label>
      {error && <p className="text-[13px] text-red-700">{error}</p>}
    </div>
  );
}
