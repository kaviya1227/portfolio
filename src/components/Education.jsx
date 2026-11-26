import { FiBookOpen, FiAward, FiGlobe } from "react-icons/fi";
import { education as ed } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionHeading index="05" label="Education" title="Academic background." />

        <Reveal className="edu card">
          <div className="edu-icon" aria-hidden="true">
            <FiBookOpen />
          </div>
          <div className="edu-main">
            <span className="edu-years">{ed.years}</span>
            <h3>{ed.degree}</h3>
            <p className="edu-school">
              {ed.institution}, {ed.location}
            </p>
            <span className="edu-score">{ed.score}</span>
          </div>
          <div className="edu-side">
            <div>
              <h4>
                <FiAward aria-hidden="true" /> Certifications
              </h4>
              <ul className="tags">
                {ed.certifications.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>
                <FiGlobe aria-hidden="true" /> Languages
              </h4>
              <ul className="tags">
                {ed.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
