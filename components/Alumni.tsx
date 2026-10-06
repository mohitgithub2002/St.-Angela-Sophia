import { Photo } from "./Photo";

export function Alumni() {
  return (
    <section id="alumni" aria-labelledby="alumni-title" className="relative overflow-hidden py-20 text-white">
      <Photo src="alumni.jpg" alt="" sizes="100vw" className="absolute inset-0" position="center 40%" />
      <div className="absolute inset-0 bg-forest/80" />
      <div className="wrap relative text-center">
        <h2 id="alumni-title" className="title !text-[clamp(26px,3.4vw,40px)] !text-white">Once an Angelite, always an Angelite</h2>
        <p className="mx-auto mt-4 max-w-[60ch] text-white/90">Our Ex-Angelite Association has kept generations of girls connected since 1997. Come back, share your story, and meet the girls who follow you.</p>
        <a href="#visit" className="mt-7 inline-block border-2 border-white px-7 py-3 text-[13px] font-medium uppercase tracking-[.1em] text-white transition-colors hover:border-moss hover:bg-moss">Reconnect with us</a>
      </div>
    </section>
  );
}
