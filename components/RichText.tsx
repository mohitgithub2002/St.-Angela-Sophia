import sanitizeHtml from "sanitize-html";

// Shows HTML written in the admin panel's editor. Only basic formatting survives sanitising.
const options: sanitizeHtml.IOptions = {
  allowedTags: ["h2", "h3", "h4", "p", "br", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "blockquote", "a", "hr", "table", "thead", "tbody", "tr", "th", "td"],
  allowedAttributes: { a: ["href", "target", "rel"], td: ["colspan", "rowspan"], th: ["colspan", "rowspan"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: (tag, attribs) => ({
      tagName: "a",
      attribs: /^https?:/.test(attribs.href ?? "") ? { ...attribs, target: "_blank", rel: "noopener" } : attribs,
    }),
  },
};

export function RichText({ html, className = "" }: { html: string; className?: string }) {
  return <div className={`rich ${className}`} dangerouslySetInnerHTML={{ __html: sanitizeHtml(html, options) }} />;
}
