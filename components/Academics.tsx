import { Journey } from "./Journey";
import { SectionHead } from "./SectionHead";
import { Streams } from "./Streams";

export function Academics() {
  return (
    <section id="academics" aria-labelledby="journey-title" className="py-16">
      <div className="wrap">
        <SectionHead id="journey-title" title="Our" accent="Sections">
          One journey, from first words to board exams. Choose a stage to see what your daughter learns there.
        </SectionHead>
        <Journey />
        <Streams />
      </div>
    </section>
  );
}
