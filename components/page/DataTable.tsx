// A bordered table that scrolls inside its own box on narrow screens, so the page never scrolls sideways.
export function DataTable({
  head,
  rows,
  caption,
  className = "",
}: {
  head: React.ReactNode[];
  rows: React.ReactNode[][];
  caption?: string;
  className?: string;
}) {
  return (
    <div className={`overflow-x-auto border border-lichen ${className}`} tabIndex={0} role="region" aria-label={caption ?? "Table"}>
      <table className="w-full min-w-[520px] border-collapse text-left text-[14.5px]">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="bg-moss text-white">
            {head.map((h, i) => <th key={i} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-lichen/70 odd:bg-white even:bg-mint">
              {r.map((cell, j) => j === 0 ? <th key={j} scope="row" className="px-4 py-3 align-top font-medium text-forest">{cell}</th> : <td key={j} className="px-4 py-3 align-top">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
