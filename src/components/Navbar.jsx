import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../store/cartSlice";
import { useApp } from "../context/AppContext";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/reservations", label: "Reservations" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const count = useSelector(selectCartCount);
  const { theme, toggleTheme, profile } = useApp();
  const { pathname } = useLocation();

  // close the mobile menu after navigating
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="brand">
          <span className="brand__icon">🌶️</span> Spice Route
        </Link>

        <button
          className="navbar__toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className={`navbar__links ${open ? "is-open" : ""}`}>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
            </NavLink>
          ))}
          <div className="navbar__actions">
            <button className="icon-btn" onClick={toggleTheme} aria-label="Switch theme" title="Switch theme">
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <NavLink to="/cart" className="icon-btn cart-link" aria-label="Cart">
              🛒 {count > 0 && <span className="badge">{count}</span>}
            </NavLink>
            <NavLink to="/profile" className="avatar" title="Profile">
              {profile.name.trim().charAt(0).toUpperCase() || "G"}
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
