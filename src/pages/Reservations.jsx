import { useEffect, useReducer, useRef, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useApp } from "../context/AppContext";

const SEED = [
  { id: 1, name: "Priya Sharma", phone: "9876543210", date: "2026-11-02", time: "20:00", guests: 4, notes: "Anniversary dinner" },
  { id: 2, name: "Rahul Verma", phone: "9123456780", date: "2026-11-05", time: "13:30", guests: 2, notes: "" },
];

// useReducer: all CRUD logic lives in one reducer
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { ...action.payload, id: Date.now() }];
    case "UPDATE":
      return state.map((r) => (r.id === action.payload.id ? action.payload : r));
    case "DELETE":
      return state.filter((r) => r.id !== action.id);
    default:
      return state;
  }
}

const init = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("sr-reservations"));
    return Array.isArray(saved) ? saved : SEED;
  } catch {
    return SEED;
  }
};

const todayISO = () => new Date().toISOString().split("T")[0];

function validate(f) {
  const e = {};
  if (f.name.trim().length < 3) e.name = "Name must be at least 3 characters";
  if (!/^[6-9]\d{9}$/.test(f.phone)) e.phone = "Enter a valid 10-digit Indian mobile number";
  if (!f.date) e.date = "Pick a date";
  else if (f.date < todayISO()) e.date = "Date can't be in the past";
  if (!f.time) e.time = "Pick a time";
  else if (f.time < "11:00" || f.time > "22:30") e.time = "We take bookings between 11:00 AM and 10:30 PM";
  const g = Number(f.guests);
  if (!Number.isInteger(g) || g < 1 || g > 12) e.guests = "Guests must be between 1 and 12";
  return e;
}

export default function Reservations() {
  useDocumentTitle("Reservations");
  const { profile } = useApp();
  const [list, dispatch] = useReducer(reducer, undefined, init);
  const blank = { name: profile.name === "Guest Diner" ? "" : profile.name, phone: profile.phone, date: "", time: "", guests: 2, notes: "" };
  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const nameRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("sr-reservations", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(t);
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const reset = () => {
    setForm(blank);
    setErrors({});
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      nameRef.current?.focus();
      return;
    }
    const payload = { ...form, name: form.name.trim(), guests: Number(form.guests) };
    if (editingId) {
      dispatch({ type: "UPDATE", payload: { ...payload, id: editingId } });
      setMessage("Reservation updated ✓");
    } else {
      dispatch({ type: "ADD", payload });
      setMessage("Table booked! See you soon 🎉");
    }
    reset();
  };

  const startEdit = (r) => {
    setForm({ name: r.name, phone: r.phone, date: r.date, time: r.time, guests: r.guests, notes: r.notes });
    setEditingId(r.id);
    setErrors({});
    nameRef.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (r) => {
    if (window.confirm(`Cancel the reservation for ${r.name}?`)) {
      dispatch({ type: "DELETE", id: r.id });
      if (editingId === r.id) reset();
    }
  };

  const sorted = [...list].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  const Field = ({ label, name, type = "text", ...rest }) => (
    <label className={`field ${errors[name] ? "has-error" : ""}`}>
      <span>{label}</span>
      <input name={name} type={type} value={form[name]} onChange={handleChange} ref={name === "name" ? nameRef : null} {...rest} />
      {errors[name] && <small className="error">{errors[name]}</small>}
    </label>
  );

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Reservations</span>
          <h1>Reserve your table</h1>
          <p className="lead">Book, edit or cancel your table. Reservations are saved on this device.</p>
        </div>
      </section>

      <div className="container section split">
        <form className="card pad form" onSubmit={handleSubmit} noValidate>
          <h3>{editingId ? "Edit reservation" : "New reservation"}</h3>
          {message && <div className="alert success">{message}</div>}
          {Field({ label: "Full name", name: "name", placeholder: "e.g. Priya Sharma" })}
          {Field({ label: "Mobile number", name: "phone", type: "tel", placeholder: "10-digit number", maxLength: 10 })}
          <div className="row">
            {Field({ label: "Date", name: "date", type: "date", min: todayISO() })}
            {Field({ label: "Time", name: "time", type: "time" })}
          </div>
          {Field({ label: "Guests", name: "guests", type: "number", min: 1, max: 12 })}
          <label className="field">
            <span>Special requests (optional)</span>
            <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} placeholder="Allergies, celebrations, seating..." />
          </label>
          <div className="row">
            <button className="btn" type="submit">{editingId ? "Save changes" : "Book table"}</button>
            {editingId && <button type="button" className="btn btn-outline" onClick={reset}>Cancel edit</button>}
          </div>
        </form>

        <div>
          <SectionTitle title={`Upcoming bookings (${sorted.length})`} />
          {sorted.length === 0 ? (
            <div className="empty"><span>📅</span><h3>No reservations yet</h3><p className="muted">Book your first table using the form.</p></div>
          ) : (
            <ul className="res-list">
              {sorted.map((r) => (
                <li key={r.id} className={`card res ${editingId === r.id ? "is-editing" : ""}`}>
                  <div className="res__date">
                    <strong>{new Date(r.date + "T00:00").toLocaleDateString("en-IN", { day: "2-digit" })}</strong>
                    <span>{new Date(r.date + "T00:00").toLocaleDateString("en-IN", { month: "short" })}</span>
                  </div>
                  <div className="res__info">
                    <h4>{r.name}</h4>
                    <span className="muted small">{r.time} · {r.guests} guest{r.guests > 1 && "s"} · {r.phone}</span>
                    {r.notes && <span className="small">📝 {r.notes}</span>}
                  </div>
                  <div className="res__actions">
                    <button className="btn btn-sm btn-outline" onClick={() => startEdit(r)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r)}>Cancel</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
