// Section heading: uppercase slab title, optional accent word, subtitle, then a short rule.
export function SectionHead({ title, accent, id, children, center = true, light = false }: { title: string; accent?: string; id: string; children?: React.ReactNode; center?: boolean; light?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <h2 id={id} className={`title ${light ? "!text-white" : ""}`}>
        {title}
        {accent && <> <span className={light ? "text-lichen" : "text-sage"}>{accent}</span></>}
      </h2>
      {children && <p className={`mt-3 text-[15px] ${light ? "text-white/80" : "text-moss"}`}>{children}</p>}
      <span className={`mt-4 block h-[3px] w-6 ${light ? "bg-white/30" : "bg-moss"} ${center ? "mx-auto" : ""}`} aria-hidden="true" />
    </div>
  );
}
