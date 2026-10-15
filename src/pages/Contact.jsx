import { useState, useRef } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";

const FAQ = [
  { q: "Do you have vegetarian and vegan options?", a: "Yes, over half our menu is vegetarian and many dishes can be made vegan. Just tell us when ordering." },
  { q: "Can I host a private event?", a: "Our upper hall seats up to 40 guests. Send us a message with your date and headcount." },
  { q: "Is parking available?", a: "Free valet parking is available for all dining guests after 6 PM." },
];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  useDocumentTitle("Contact");
  const [form, setForm] = useState({ name: "", email: "", subject: "General enquiry", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const refs = { name: useRef(null), email: useRef(null), message: useRef(null) };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 3) er.name = "Please enter your full name";
    if (!emailRe.test(form.email)) er.email = "Enter a valid email address";
    if (form.message.trim().length < 10) er.message = "Message should be at least 10 characters";
    setErrors(er);

    const firstBad = ["name", "email", "message"].find((k) => er[k]);
    if (firstBad) {
      refs[firstBad].current?.focus(); // useRef: focus first invalid field
      return;
    }
    setSent(true);
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>We'd love to hear from you</h1>
          <p className="lead">Questions, feedback or event enquiries — drop us a line.</p>
        </div>
      </section>

      <div className="container section split">
        <div>
          <div className="card pad info-list">
            <div><span className="icon-circle">📍</span><div><strong>Address</strong><p className="muted">12, Residency Road, Coimbatore, Tamil Nadu 641018</p></div></div>
            <div><span className="icon-circle">📞</span><div><strong>Phone</strong><p className="muted">+91 98765 43210</p></div></div>
            <div><span className="icon-circle">✉️</span><div><strong>Email</strong><p className="muted">hello@spiceroute.example</p></div></div>
            <div><span className="icon-circle">🕑</span><div><strong>Hours</strong><p className="muted">Mon–Sun · 11:00 AM – 11:00 PM</p></div></div>
          </div>

          <h3 className="mt">Frequently asked</h3>
          <div className="faq">
            {FAQ.map((f, i) => (
              <div key={f.q} className={`faq__item ${openFaq === i ? "open" : ""}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                  {f.q} <span>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="muted">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>

        {sent ? (
          <div className="card pad empty">
            <span>✅</span>
            <h3>Thanks, {form.name.split(" ")[0]}!</h3>
            <p className="muted">Your message has been received. We'll reply to {form.email} within one working day.</p>
            <button className="btn btn-outline" onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "General enquiry", message: "" }); }}>
              Send another message
            </button>
          </div>
        ) : (
          <form className="card pad form" onSubmit={handleSubmit} noValidate>
            <h3>Send a message</h3>
            <label className={`field ${errors.name ? "has-error" : ""}`}>
              <span>Name</span>
              <input ref={refs.name} name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
              {errors.name && <small className="error">{errors.name}</small>}
            </label>
            <label className={`field ${errors.email ? "has-error" : ""}`}>
              <span>Email</span>
              <input ref={refs.email} name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
              {errors.email && <small className="error">{errors.email}</small>}
            </label>
            <label className="field">
              <span>Subject</span>
              <select name="subject" value={form.subject} onChange={handleChange}>
                <option>General enquiry</option>
                <option>Private event</option>
                <option>Feedback</option>
                <option>Careers</option>
              </select>
            </label>
            <label className={`field ${errors.message ? "has-error" : ""}`}>
              <span>Message <em className="muted small">({form.message.length}/500)</em></span>
              <textarea ref={refs.message} name="message" rows="5" maxLength={500} value={form.message} onChange={handleChange} placeholder="How can we help?" />
              {errors.message && <small className="error">{errors.message}</small>}
            </label>
            <button className="btn" type="submit">Send message</button>
          </form>
        )}
      </div>
    </>
  );
}
