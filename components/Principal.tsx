import { Icon } from "./Icon";
import { Photo } from "./Photo";

export function Principal() {
  return (
    <section id="principal" aria-labelledby="principal-title" className="relative overflow-hidden bg-mint py-16">
      <div className="wrap grid items-stretch gap-0 md:grid-cols-[1.25fr_.75fr] lg:grid-cols-[1.4fr_.6fr]">
        <div className="flex flex-col justify-center bg-white px-[clamp(24px,4vw,56px)] py-10 shadow-[0_2px_10px_rgba(0,0,0,.06)]">
          <h2 id="principal-title" className="title">Message from <span className="text-sage">the Principal</span></h2>
          <span className="mt-4 block h-[3px] w-6 bg-moss" aria-hidden="true" />
          <blockquote className="mt-6 font-serif text-[clamp(19px,2vw,24px)] font-light italic leading-[1.5] text-forest">
            &ldquo;Our hope is simple: that every girl leaves us knowing her mind, minding her heart, and ready to serve.&rdquo;
          </blockquote>
          <div className="mt-5 space-y-3 text-[15px] leading-[1.75]">
            <p>As we celebrate one hundred years in Jaipur, we give thanks for the Sisters, teachers, parents and students who built this school. Academic excellence remains at our core, and we balance it with character, emotional resilience and a spirit of curiosity.</p>
            <p>We invite you to visit us, meet our teachers and see a school day for yourself.</p>
          </div>
          <p className="mt-6 font-semibold text-moss">Dr. Sister Cynthia David<small className="block text-[13px] font-normal text-forest/70">Principal, St. Angela Sophia Sr. Sec. School</small></p>
          <a href="#visit" className="btn group mt-6 inline-flex w-fit items-center gap-2">
            Visit Us <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <Photo src="principal.jpg" alt="Dr. Sister Cynthia David, Principal" sizes="(min-width: 768px) 35vw, 100vw" className="min-h-[380px] w-full" position="55% 30%" />
      </div>
    </section>
  );
}
