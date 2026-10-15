import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="brand"> Spice Route</div>
          <p className="muted">Regional Indian kitchens, one table. Cooked slowly, served warmly.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/menu">Menu</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="/about">Our story</Link>
        </div>
        <div>
          <h4>Visit</h4>
          <p className="muted">12, Residency Road<br />Coimbatore, Tamil Nadu</p>
          <p className="muted">Open daily · 11:00 AM – 11:00 PM</p>
        </div>
      </div>
    </footer>
  );
}
