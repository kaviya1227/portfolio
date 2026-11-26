import { FiArrowRight, FiMail, FiCode } from "react-icons/fi";
import { profile } from "../data.js";

function DevCard() {
  return (
    <div className="dev-visual" aria-hidden="true">
      <div className="dev-glow" />

      <div className="code-window">
        <div className="code-bar">
          <span className="dot dot-r" />
          <span className="dot dot-y" />
          <span className="dot dot-g" />
          <span className="code-file">kaviya.js</span>
        </div>
        <pre className="code-body">
          <code>
            <span className="t-k">const</span> <span className="t-v">developer</span> {"= {"}
            {"\n  "}name: <span className="t-s">"Kaviya M"</span>,
            {"\n  "}role: <span className="t-s">"Full Stack Developer"</span>,
            {"\n  "}stack: [<span className="t-s">"React"</span>, <span className="t-s">"Node"</span>,
            {"\n    "}<span className="t-s">"Express"</span>, <span className="t-s">"MongoDB"</span>],
            {"\n  "}focus: <span className="t-s">"responsive, user-friendly apps"</span>,
            {"\n};\n\n"}
            <span className="t-c">// always learning, always shipping</span>
            <span className="caret" />
          </code>
        </pre>
      </div>

      <div className="avatar-card">
        <div>
          <strong>Kaviya M</strong>
          <small>MERN Stack Developer</small>
        </div>
      </div>

      <div className="chip chip-a">React.js</div>
      <div className="chip chip-b">Node.js</div>
      <div className="chip chip-c">MongoDB</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="status-pill hero-anim" style={{ "--d": "0ms" }}>
            <FiCode aria-hidden="true" /> Full MERN Stack Developer
          </span>

          <h1 className="hero-anim" style={{ "--d": "80ms" }}>
            Hi, I'm <span className="grad-text">{profile.name}</span>,<br />
            a {profile.role}.
          </h1>

          <p className="hero-lead hero-anim" style={{ "--d": "160ms" }}>
            I build responsive, user-friendly web applications with the MERN
            stack — clean interfaces on the front, dependable APIs and data on
            the back.
          </p>

          <div className="hero-cta hero-anim" style={{ "--d": "240ms" }}>
            <a href="#projects" className="btn btn-primary">
              View My Projects <FiArrowRight aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Contact Me <FiMail aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="hero-art hero-anim" style={{ "--d": "200ms" }}>
          <DevCard />
        </div>
      </div>
    </section>
  );
}
