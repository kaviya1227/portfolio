import { experience, learningFocus } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";

export default function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <SectionHeading
          index="04"
          label="Experience"
          title="Where I've worked."
        />

        <ol className="timeline">
          {experience.map((j, i) => (
            <Reveal as="li" key={j.title} delay={i * 80} className={`tl-item ${j.current ? "current" : ""}`}>
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-card card">
                <div className="tl-top">
                  <span className="tl-period">{j.period}</span>
                  {j.current && <span className="tl-now">Now</span>}
                </div>
                <h3>{j.title}</h3>
                <span className="tl-place">{j.place}</span>
                <p>{j.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="focus">
          <h3>Continuous learning</h3>
          <ul className="tags tags-lg">
            {learningFocus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
