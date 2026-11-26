import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaAws } from "react-icons/fa";
import { SiExpress, SiMongodb } from "react-icons/si";
import { SiVercel } from "react-icons/si";
import { FiServer, FiDatabase, FiFigma, FiImage, FiPenTool, FiLayers, FiMessageSquare, FiCpu, FiHeart, FiZap, FiBox } from "react-icons/fi";
import { skillGroups } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";

const icons = {
  html: FaHtml5,
  css: FaCss3Alt,
  js: FaJs,
  react: FaReact,
  node: FaNodeJs,
  express: SiExpress,
  api: FiServer,
  mongo: SiMongodb,
  db: FiDatabase,
  git: FaGitAlt,
  github: FaGithub,
  aws: FaAws,
  chatgpt: FiMessageSquare,
  claude: FiCpu,
  lovable: FiHeart,
  antigravity: FiZap,
  vercel: SiVercel,
  v0: FiBox,
  figma: FiFigma,
  photoshop: FiImage,
  illustrator: FiPenTool,
  corel: FiLayers,
};

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <SectionHeading
          index="02"
          label="Skills"
          title="The toolkit I build with."
          intro="A MERN-focused stack, backed by version control, cloud basics and a design background."
        />

        <div className="skills-grid">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 70} className="skill-card card">
              <h3>{g.title}</h3>
              <p className="skill-blurb">{g.blurb}</p>
              <ul>
                {g.items.map((s) => {
                  const Icon = icons[s.icon];
                  return (
                    <li key={s.name}>
                      <span className="skill-icon">{Icon && <Icon aria-hidden="true" />}</span>
                      {s.name}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
