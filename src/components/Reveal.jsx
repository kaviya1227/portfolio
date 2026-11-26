import { useReveal } from "../hooks/useReveal.js";

/** Fade/slide-in wrapper. `delay` is in milliseconds. */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "", style }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "in" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
