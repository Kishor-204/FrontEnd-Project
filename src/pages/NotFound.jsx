import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page not found");
  return (
    <div className="container section">
      <div className="empty">
        <span>🍽️</span>
        <h1>404</h1>
        <h3>This page isn't on the menu</h3>
        <p className="muted">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn">Back to home</Link>
      </div>
    </div>
  );
}
