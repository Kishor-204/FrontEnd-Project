import SectionTitle from "../components/SectionTitle";
import useDocumentTitle from "../hooks/useDocumentTitle";

const TEAM = [
  { name: "Chef Meenakshi Rao", role: "Head Chef", emoji: "👩‍🍳", bio: "Trained in Chettinad home kitchens, she grinds every masala in-house." },
  { name: "Arjun Mehta", role: "Pastry & Dessert Chef", emoji: "🧑‍🍳", bio: "Reinvents mithai classics with seasonal fruit and local dairy." },
  { name: "Farhan Qureshi", role: "Biryani Master", emoji: "👨‍🍳", bio: "Third-generation dum cook from Hyderabad's old city." },
];

const VALUES = [
  { icon: "🌱", title: "Fresh & local", text: "Vegetables and dairy come from farms within 80 km of our kitchen." },
  { icon: "🔥", title: "Slow cooked", text: "Gravies simmer for hours and biryanis are sealed and cooked on dum." },
  { icon: "🫶", title: "Warm hospitality", text: "Athithi devo bhava: the guest is treated as family." },
];

const TIMELINE = [
  { year: "2018", text: "Spice Route opens with 8 tables and a 12-dish menu." },
  { year: "2020", text: "We launch contactless takeaway and community meals." },
  { year: "2023", text: "Renovated dining hall and open kitchen unveiled." },
  { year: "2026", text: "Over 12,000 guests served and counting." },
];

export default function About() {
  useDocumentTitle("About");
  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Our story</span>
          <h1>Food that remembers where it came from</h1>
          <p className="lead">
            Spice Route began as a weekend pop-up with one idea: bring India's regional cooking to one table without
            watering down a single masala.
          </p>
        </div>
      </section>

      <section className="container section">
        <SectionTitle eyebrow="What we believe" title="Our values" />
        <div className="grid grid-3">
          {VALUES.map((v) => (
            <div key={v.title} className="card pad">
              <div className="icon-circle">{v.icon}</div>
              <h3>{v.title}</h3>
              <p className="muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <SectionTitle eyebrow="The people" title="Meet the kitchen team" />
        <div className="grid grid-3">
          {TEAM.map((p) => (
            <div key={p.name} className="card pad team">
              <div className="team__avatar">{p.emoji}</div>
              <h3>{p.name}</h3>
              <span className="eyebrow">{p.role}</span>
              <p className="muted">{p.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section">
        <SectionTitle eyebrow="Journey" title="Eight years on the spice route" />
        <ol className="timeline">
          {TIMELINE.map((t) => (
            <li key={t.year}>
              <strong>{t.year}</strong>
              <p className="muted">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
