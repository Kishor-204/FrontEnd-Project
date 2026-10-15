import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { DISHES, formatPrice, getDishById } from "../../data/menu";
import DishCard from "../../components/DishCard";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function DishDetail() {
  const { category, dishId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const dish = getDishById(dishId);
  useDocumentTitle(dish ? dish.name : "Dish not found");

  if (!dish || dish.category !== category) {
    return (
      <div className="empty">
        <span>🤷</span>
        <h3>We couldn't find that dish</h3>
        <Link to="/menu" className="btn">Back to menu</Link>
      </div>
    );
  }

  const related = DISHES.filter((d) => d.category === dish.category && d.id !== dish.id).slice(0, 3);

  const handleAdd = () => {
    dispatch(addToCart({ id: dish.id, qty }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <button className="link-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail">
        <div className="detail__art">{dish.emoji}</div>
        <div className="detail__info">
          <div className="dish-card__tags">
            <span className={`dot ${dish.veg ? "veg" : "nonveg"}`} />
            <span className="muted small">{dish.veg ? "Vegetarian" : "Non-vegetarian"}</span>
            <span className="rating">★ {dish.rating}</span>
          </div>
          <h2>{dish.name}</h2>
          <p className="lead">{dish.description}</p>

          <h4>Key ingredients</h4>
          <ul className="chips">
            {dish.ingredients.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>

          <p className="muted">Spice level: {dish.spice === 0 ? "None" : "🌶".repeat(dish.spice)}</p>

          <div className="detail__buy">
            <strong className="price">{formatPrice(dish.price * qty)}</strong>
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase">+</button>
            </div>
            <button className="btn" onClick={handleAdd}>{added ? "✓ Added" : "Add to cart"}</button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <h3 className="mt">More from this category</h3>
          <div className="grid grid-3">
            {related.map((d) => (
              <DishCard key={d.id} dish={d} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
