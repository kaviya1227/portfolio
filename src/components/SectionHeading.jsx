import Reveal from "./Reveal.jsx";

export default function SectionHeading({ index, label, title, intro }) {
  return (
    <Reveal className="section-heading">
      <span className="eyebrow">
        <span className="eyebrow-num">{index}</span>
        <span className="eyebrow-line" aria-hidden="true" />
        {label}
      </span>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </Reveal>
  );
}
