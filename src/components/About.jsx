import { about } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading index="01" label="About" title="Skilled across the full stack." />

        <Reveal className="about-text">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
