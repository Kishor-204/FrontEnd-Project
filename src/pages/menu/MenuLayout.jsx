import { NavLink, Outlet, useLocation } from "react-router-dom";
import { CATEGORIES } from "../../data/menu";
import useDocumentTitle from "../../hooks/useDocumentTitle";

// Parent route for nested routing: renders category tabs + <Outlet />
export default function MenuLayout() {
  useDocumentTitle("Menu");
  const { search } = useLocation(); // keep search/filter when switching tabs

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Our menu</span>
          <h1>Taste the regions of India</h1>
          <p className="lead">Search, filter and sort. Every dish is cooked to order.</p>
        </div>
      </section>

      <div className="container section">
        <nav className="tabs" aria-label="Menu categories">
          <NavLink to={{ pathname: "/menu", search }} end className={({ isActive }) => (isActive ? "tab active" : "tab")}>
            All
          </NavLink>
          {CATEGORIES.map((c) => (
            <NavLink
              key={c.slug}
              to={{ pathname: `/menu/${c.slug}`, search }}
              className={({ isActive }) => (isActive ? "tab active" : "tab")}
            >
              {c.emoji} {c.label}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </div>
    </>
  );
}
