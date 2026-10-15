import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { formatPrice } from "../data/menu";

export default function DishCard({ dish }) {
  const dispatch = useDispatch();

  return (
    <article className="card dish-card">
      <Link to={`/menu/${dish.category}/${dish.id}`} className="dish-card__art" aria-label={`View ${dish.name}`}>
        <span>{dish.emoji}</span>
      </Link>
      <div className="dish-card__body">
        <div className="dish-card__tags">
          <span className={`dot ${dish.veg ? "veg" : "nonveg"}`} title={dish.veg ? "Vegetarian" : "Non-vegetarian"} />
          <span className="muted small">{"🌶".repeat(dish.spice) || "Mild"}</span>
          <span className="rating">★ {dish.rating}</span>
        </div>
        <h3>
          <Link to={`/menu/${dish.category}/${dish.id}`}>{dish.name}</Link>
        </h3>
        <p className="muted clamp">{dish.description}</p>
        <div className="dish-card__footer">
          <strong>{formatPrice(dish.price)}</strong>
          <button className="btn btn-sm" onClick={() => dispatch(addToCart({ id: dish.id }))}>
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}
