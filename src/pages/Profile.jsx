import { useState } from "react";
import { useSelector } from "react-redux";
import { useApp } from "../context/AppContext";
import { DISHES } from "../data/menu";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Profile() {
  useDocumentTitle("Profile");
  const { profile, updateProfile, theme, toggleTheme } = useApp();
  const cartCount = useSelector((s) => s.cart.items.reduce((n, i) => n + i.qty, 0));
  const [form, setForm] = useState(profile);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  let reservations = 0;
  try {
    reservations = (JSON.parse(localStorage.getItem("sr-reservations")) || []).length;
  } catch {
    reservations = 0;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: undefined });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 3) er.name = "Name must be at least 3 characters";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) er.email = "Enter a valid email";
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) er.phone = "Enter a valid 10-digit mobile number";
    setErrors(er);
    if (Object.keys(er).length) return;
    updateProfile({ ...form, name: form.name.trim() });
    setSaved(true);
  };

  return (
    <>
      <section className="page-header">
        <div className="container profile-head">
          <div className="avatar avatar--lg">{profile.name.trim().charAt(0).toUpperCase() || "G"}</div>
          <div>
            <span className="eyebrow">Profile</span>
            <h1>{profile.name}</h1>
            <p className="muted">{profile.email || "Add your email to personalise your experience"}</p>
          </div>
        </div>
      </section>

      <div className="container section split">
        <form className="card pad form" onSubmit={handleSubmit} noValidate>
          <h3>Account details</h3>
          {saved && <div className="alert success">Profile saved ✓</div>}
          <label className={`field ${errors.name ? "has-error" : ""}`}>
            <span>Name</span>
            <input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <small className="error">{errors.name}</small>}
          </label>
          <label className={`field ${errors.email ? "has-error" : ""}`}>
            <span>Email</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} />
            {errors.email && <small className="error">{errors.email}</small>}
          </label>
          <label className={`field ${errors.phone ? "has-error" : ""}`}>
            <span>Mobile</span>
            <input name="phone" type="tel" maxLength={10} value={form.phone} onChange={handleChange} />
            {errors.phone && <small className="error">{errors.phone}</small>}
          </label>
          <label className="field">
            <span>Favourite dish</span>
            <select name="favourite" value={form.favourite} onChange={handleChange}>
              {DISHES.map((d) => (
                <option key={d.id}>{d.name}</option>
              ))}
            </select>
          </label>
          <label className="check">
            <input type="checkbox" name="vegOnly" checked={form.vegOnly} onChange={handleChange} />
            I prefer vegetarian food
          </label>
          <button className="btn" type="submit">Save profile</button>
        </form>

        <div className="stack">
          <div className="card pad">
            <h3>Your activity</h3>
            <div className="mini-stats">
              <div><strong>{cartCount}</strong><span className="muted small">Items in cart</span></div>
              <div><strong>{reservations}</strong><span className="muted small">Reservations</span></div>
              <div><strong>{profile.favourite.split(" ")[0]}</strong><span className="muted small">Favourite</span></div>
            </div>
          </div>
          <div className="card pad">
            <h3>Appearance</h3>
            <p className="muted">Currently using the <strong>{theme}</strong> theme.</p>
            <button className="btn btn-outline" onClick={toggleTheme}>Switch to {theme === "light" ? "dark" : "light"} mode</button>
          </div>
        </div>
      </div>
    </>
  );
}
