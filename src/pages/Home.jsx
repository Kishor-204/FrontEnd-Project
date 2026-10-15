import { Link } from "react-router-dom";
import DishCard from "../components/DishCard";
import SectionTitle from "../components/SectionTitle";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { DISHES, CATEGORIES } from "../data/menu";

const STATS = [
  { value: "16+", label: "Signature dishes" },
  { value: "4.7★", label: "Average rating" },
  { value: "12k", label: "Happy guests" },
  { value: "8 yrs", label: "Of slow cooking" },
];

export default function Home() {
  useDocumentTitle("Home");
  const featured = [...DISHES].sort((a, b) => b.rating - a.rating).slice(0, 3);

  // API integration: guest reviews from a public REST API
  const { data: reviews, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/comments?_limit=3"
  );

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <span className="eyebrow">Regional Indian kitchen · Est. 2018</span>
            <h1>
              Every plate is a <em>journey</em> across India.
            </h1>
            <p className="lead">
              From Chettinad pepper to Hyderabadi dum, we cook age-old recipes slowly with whole spices ground fresh
              every morning.
            </p>
            <div className="hero__cta">
              <Link to="/menu" className="btn">Explore the menu</Link>
              <Link to="/reservations" className="btn btn-outline">Book a table</Link>
            </div>
          </div>
          <div className="hero__art" aria-hidden="true">
            <span className="hero__plate">🍛</span>
            <span className="float f1">🌶️</span>
            <span className="float f2">🍋</span>
            <span className="float f3">🌿</span>
          </div>
        </div>
      </section>

      <section className="container stats">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <strong>{s.value}</strong>
            <span className="muted">{s.label}</span>
          </div>
        ))}
      </section>

      <section className="container section">
        <SectionTitle eyebrow="Chef's picks" title="Most loved dishes" subtitle="The three highest-rated plates on our menu right now." />
        <div className="grid grid-3">
          {featured.map((d) => (
            <DishCard key={d.id} dish={d} />
          ))}
        </div>
      </section>

      <section className="container section">
        <SectionTitle eyebrow="Browse" title="Find your craving" />
        <div className="grid grid-4">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/menu/${c.slug}`} className="card category-tile">
              <span className="category-tile__emoji">{c.emoji}</span>
              <h3>{c.label}</h3>
              <span className="muted small">
                {DISHES.filter((d) => d.category === c.slug).length} dishes →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <SectionTitle eyebrow="Reviews" title="What our guests say" />
        {loading && <Spinner label="Loading reviews..." />}
        {error && (
          <div className="alert">
            Couldn't load reviews ({error}). <button className="link-btn" onClick={refetch}>Try again</button>
          </div>
        )}
        {reviews && (
          <div className="grid grid-3">
            {reviews.map((r) => (
              <blockquote key={r.id} className="card review">
                <div className="rating">★★★★★</div>
                <p>“{r.body.split("\n")[0]}.”</p>
                <footer>
                  <strong>{r.name.split(" ").slice(0, 2).join(" ")}</strong>
                  <span className="muted small">{r.email}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
