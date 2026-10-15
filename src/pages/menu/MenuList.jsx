import { Navigate, useParams, useSearchParams } from "react-router-dom";
import DishCard from "../../components/DishCard";
import { CATEGORIES, DISHES } from "../../data/menu";

export default function MenuList() {
  const { category } = useParams();
  const [params, setParams] = useSearchParams();

  const q = params.get("q") || "";
  const veg = params.get("veg") === "1";
  const sort = params.get("sort") || "popular";

  // unknown category -> back to full menu
  if (category && !CATEGORIES.some((c) => c.slug === category)) {
    return <Navigate to="/menu" replace />;
  }

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  let dishes = DISHES.filter((d) => (category ? d.category === category : true))
    .filter((d) => (veg ? d.veg : true))
    .filter((d) => d.name.toLowerCase().includes(q.trim().toLowerCase()));

  const sorters = {
    popular: (a, b) => b.rating - a.rating,
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name),
  };
  dishes = [...dishes].sort(sorters[sort] || sorters.popular);

  return (
    <>
      <div className="toolbar">
        <input
          type="search"
          placeholder="Search dishes..."
          value={q}
          onChange={(e) => update("q", e.target.value)}
          aria-label="Search dishes"
        />
        <select value={sort} onChange={(e) => update("sort", e.target.value === "popular" ? "" : e.target.value)} aria-label="Sort dishes">
          <option value="popular">Top rated</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name A–Z</option>
        </select>
        <label className="check">
          <input type="checkbox" checked={veg} onChange={(e) => update("veg", e.target.checked ? "1" : "")} />
          Veg only
        </label>
      </div>

      <p className="muted small">{dishes.length} dish{dishes.length !== 1 && "es"} found</p>

      {dishes.length === 0 ? (
        <div className="empty">
          <span>🍽️</span>
          <h3>No dishes match your filters</h3>
          <button className="btn btn-outline" onClick={() => setParams({}, { replace: true })}>Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-3">
          {dishes.map((d) => (
            <DishCard key={d.id} dish={d} />
          ))}
        </div>
      )}
    </>
  );
}
