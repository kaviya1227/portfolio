import { useEffect, useState } from "react";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import { navLinks, profile } from "../data.js";
import { useActiveSection } from "../hooks/useActiveSection.js";

const ids = navLinks.map((l) => l.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open; close on Escape.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand" onClick={close} aria-label="Back to top">
          <span className="brand-name">Kaviya M</span>
        </a>

        <nav
          id="primary-nav"
          className={`nav-links ${open ? "open" : ""}`}
          aria-label="Primary"
        >
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={close}
              className={active === l.id ? "active" : ""}
              aria-current={active === l.id ? "true" : undefined}
            >
              {l.label}
            </a>
          ))}
          <a className="btn btn-ghost btn-sm nav-resume" href={profile.resume} target="_blank" rel="noreferrer" onClick={close}>
            <FiDownload aria-hidden="true" /> Resume
          </a>
        </nav>

        <button
          className="nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-nav"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
}
