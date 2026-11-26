import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { profile } from "../data.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} <strong>{profile.name}</strong>. All rights reserved.
        </p>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <FiMail />
          </a>
        </div>
      </div>
    </footer>
  );
}
