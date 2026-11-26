import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { projects } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";

const isLink = (url) => /^https?:\/\//i.test(url || "");

/**
 * Project image, in priority order:
 *  1. project.screenshot  (a local file in /public/projects)
 *  2. a live preview screenshot of project.demo (the site's first page)
 *  3. a neutral browser-frame placeholder (no demo link yet, or preview failed)
 */
function ProjectImage({ project }) {
  const [failed, setFailed] = useState(false);
  const { title, screenshot, demo } = project;

  const src = screenshot
    ? screenshot
    : isLink(demo)
    ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(demo)}?w=800&h=480`
    : null;

  if (!src || failed) {
    return (
      <div className="pframe" aria-hidden="true">
        <div className="pframe-bar">
          <i /><i /><i />
          <span />
        </div>
        <div className="pframe-body">
          <strong>{title}</strong>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${title} — first page preview`}
      loading="lazy"
      width="800"
      height="480"
      onError={() => setFailed(true)}
    />
  );
}

function ProjectCard({ project, index }) {
  const { title, description, tech, github, demo, theme } = project;
  const themeVars = theme
    ? { "--t-bg": theme.bg, "--t-accent": theme.accent, "--t-border": theme.border }
    : undefined;

  return (
    <Reveal delay={(index % 2) * 90} as="article" className={`project card ${theme ? "themed" : ""}`} style={themeVars}>
      <div className="project-media">
        <ProjectImage project={project} />
      </div>
      <div className="project-body">
        <h3>{title}</h3>
        <p>{description}</p>
        <ul className="tags" aria-label="Technologies used">
          {tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className="project-links">
          <a href={github} target="_blank" rel="noreferrer" aria-label={`${title} on GitHub`}>
            <FaGithub aria-hidden="true" /> Code
          </a>
          <a href={demo} target="_blank" rel="noreferrer" aria-label={`${title} live demo`}>
            <FiExternalLink aria-hidden="true" /> Live demo
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHeading
          index="03"
          label="Projects"
          title="Things I've built."
          intro="A selection of academic and personal work, from storefront UI to data-driven applications."
        />
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
