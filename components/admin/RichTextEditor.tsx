"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

// A small rich-text editor for staff. The HTML goes into a hidden input called `name`.
export function RichTextEditor({ name, defaultValue = "" }: { name: string; defaultValue?: string }) {
  const [html, setHtml] = useState(defaultValue);
  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: { levels: [2, 3, 4] }, code: false, codeBlock: false, link: { openOnClick: false } })],
    content: defaultValue,
    immediatelyRender: false,
    editorProps: { attributes: { class: "rich min-h-[260px] px-4 py-3 focus:outline-none" } },
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  const btn = (label: string, run: () => void, active = false, title = label) => (
    <button
      type="button"
      title={title}
      aria-pressed={active}
      onMouseDown={(e) => e.preventDefault()}
      onClick={run}
      className={`min-w-9 px-2 py-1.5 text-[13px] font-semibold ${active ? "bg-moss text-white" : "text-forest hover:bg-mint"}`}
    >
      {label}
    </button>
  );

  function link() {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const href = window.prompt("Link address (https://… or /page)", prev ?? "https://");
    if (href === null) return;
    if (!href) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }

  return (
    <div className="border border-lichen bg-white focus-within:border-moss">
      <input type="hidden" name={name} value={html} />
      {editor && (
        <div className="flex flex-wrap gap-0.5 border-b border-lichen bg-[#fafcf7] p-1" role="toolbar" aria-label="Formatting">
          {btn("H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }), "Heading")}
          {btn("H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }), "Sub-heading")}
          {btn("B", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"), "Bold")}
          {btn("I", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"), "Italic")}
          {btn("U", () => editor.chain().focus().toggleUnderline().run(), editor.isActive("underline"), "Underline")}
          {btn("• List", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"), "Bulleted list")}
          {btn("1. List", () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"), "Numbered list")}
          {btn("❝ Quote", () => editor.chain().focus().toggleBlockquote().run(), editor.isActive("blockquote"), "Quote")}
          {btn("Link", link, editor.isActive("link"))}
          {btn("—", () => editor.chain().focus().setHorizontalRule().run(), false, "Divider line")}
          {btn("↶", () => editor.chain().focus().undo().run(), false, "Undo")}
          {btn("↷", () => editor.chain().focus().redo().run(), false, "Redo")}
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
