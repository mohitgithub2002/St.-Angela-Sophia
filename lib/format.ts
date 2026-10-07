// Small formatting helpers shared by public pages and the admin panel.

export const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, "").replace(/^0/, "+91")}`;

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const monthFmt = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric", timeZone: "UTC" });

// Dates are stored as YYYY-MM-DD; formatting in UTC keeps them from shifting a day.
export const formatDate = (d: string | null | undefined) => (d ? dateFmt.format(new Date(`${d.slice(0, 10)}T00:00:00Z`)) : "");
export const formatMonth = (d: string) => monthFmt.format(new Date(`${d.slice(0, 10)}T00:00:00Z`));
export const formatRange = (start: string, end?: string | null) => (end && end !== start ? `${formatDate(start)} – ${formatDate(end)}` : formatDate(start));

export const rupees = (n: number) => `₹${Number(n).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

export const passPercent = (registered: number, passed: number) => (registered > 0 ? `${((passed / registered) * 100).toFixed(2)}%` : "—");

export const today = () => new Date().toISOString().slice(0, 10);
