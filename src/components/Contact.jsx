import { useState } from "react";
import { FiMail, FiSend, FiCheckCircle, FiAlertCircle, FiArrowUpRight } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";

// URL of the contact server (see /server). Set VITE_API_URL in .env.
const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  const name = v.name.trim();
  if (!name) e.name = "Please enter your name.";
  else if (name.length < 2) e.name = "Name must be at least 2 characters.";

  const email = v.email.trim();
  if (!email) e.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) e.email = "Enter a valid email address.";

  const msg = v.message.trim();
  if (!msg) e.message = "Please write a message.";
  else if (msg.length < 10) e.message = "Message must be at least 10 characters.";
  else if (msg.length > 1000) e.message = "Message must be under 1000 characters.";
  return e;
}

const initial = { name: "", email: "", message: "", website: "" }; // `website` = spam honeypot

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | opened | error

  const errors = validate(values);
  const show = (field) => touched[field] && errors[field];

  const onChange = (e) => {
    setStatus("idle");
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const reset = () => {
    setValues(initial);
    setTouched({});
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) return;

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      website: values.website,
    };

    // No server configured yet → fall back to the visitor's mail app.
    if (!API_URL) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${payload.name}`);
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("opened");
      reset();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const links = [
    { icon: FiMail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: FaLinkedin, label: "LinkedIn", value: "kaviya-m", href: profile.linkedin },
    { icon: FaGithub, label: "GitHub", value: "your-username", href: profile.github },
  ];

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <SectionHeading
          index="06"
          label="Contact"
          title="Let's build something together."
          intro="I'm open to Full Stack, Frontend and Junior Web Developer roles. Send a note and I'll get back to you."
        />

        <div className="contact-grid">
          <Reveal className="contact-links">
            {links.map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} target={label === "Email" ? undefined : "_blank"} rel="noreferrer" className="contact-link card">
                <span className="cl-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="cl-text">
                  <small>{label}</small>
                  <strong>{value}</strong>
                </span>
                <FiArrowUpRight className="cl-arrow" aria-hidden="true" />
              </a>
            ))}
          </Reveal>

          <Reveal delay={100}>
            <form className="form card" onSubmit={onSubmit} noValidate>
              <div className={`field ${show("name") ? "invalid" : ""}`}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" value={values.name} onChange={onChange} onBlur={onBlur} aria-invalid={!!show("name")} aria-describedby="name-err" />
                <span id="name-err" className="err" role="alert">{show("name")}</span>
              </div>

              <div className={`field ${show("email") ? "invalid" : ""}`}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" value={values.email} onChange={onChange} onBlur={onBlur} aria-invalid={!!show("email")} aria-describedby="email-err" />
                <span id="email-err" className="err" role="alert">{show("email")}</span>
              </div>

              <div className={`field ${show("message") ? "invalid" : ""}`}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell me about the role or project…" value={values.message} onChange={onChange} onBlur={onBlur} aria-invalid={!!show("message")} aria-describedby="message-err" />
                <span id="message-err" className="err" role="alert">{show("message")}</span>
              </div>

              {/* Honeypot: hidden from people, bots tend to fill it in */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
              </div>

              <button type="submit" className="btn btn-primary form-submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"} <FiSend aria-hidden="true" />
              </button>

              {status === "sent" && (
                <p className="form-note form-success" role="status">
                  <FiCheckCircle aria-hidden="true" /> Thank you! Your message has been sent. I'll get back to you soon.
                </p>
              )}
              {status === "opened" && (
                <p className="form-note form-success" role="status">
                  <FiCheckCircle aria-hidden="true" /> Your email app should now open with the message ready to send.
                </p>
              )}
              {status === "error" && (
                <p className="form-note form-error" role="alert">
                  <FiAlertCircle aria-hidden="true" /> Sorry, the message couldn't be sent. Please email me directly at {profile.email}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
