// Reusable page banner. Props: title, subtitle, children (optional extra content)
export default function PageHeader({ title, subtitle, children }) {
  return (
    <section className="page-header">
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p className="lead">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
