// Reusable heading block (props: eyebrow, title, subtitle, center)
export default function SectionTitle({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`section-title ${center ? "center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {subtitle && <p className="muted">{subtitle}</p>}
    </div>
  );
}
