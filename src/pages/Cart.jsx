import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrement, increment, removeFromCart } from "../store/cartSlice";
import { formatPrice, getDishById } from "../data/menu";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function Cart() {
  useDocumentTitle("Your cart");
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(null);

  const lines = items
    .map((i) => ({ ...i, dish: getDishById(i.id) }))
    .filter((l) => l.dish);

  const subtotal = lines.reduce((sum, l) => sum + l.dish.price * l.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const delivery = subtotal === 0 || subtotal >= 500 ? 0 : 40;
  const total = subtotal + gst + delivery;

  const placeOrder = () => {
    setOrderId("SR" + Math.floor(100000 + Math.random() * 900000));
    dispatch(clearCart());
  };

  if (orderId) {
    return (
      <div className="container section">
        <div className="empty card pad">
          <span>🎉</span>
          <h2>Order placed!</h2>
          <p className="muted">Your order <strong>{orderId}</strong> is being prepared. Estimated time: 35 minutes.</p>
          <Link to="/menu" className="btn">Order something else</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Cart</span>
          <h1>Your order</h1>
        </div>
      </section>

      <div className="container section">
        {lines.length === 0 ? (
          <div className="empty">
            <span>🛒</span>
            <h3>Your cart is empty</h3>
            <p className="muted">Add a few dishes from the menu to get started.</p>
            <Link to="/menu" className="btn">Browse menu</Link>
          </div>
        ) : (
          <div className="split split--cart">
            <ul className="cart-list">
              {lines.map(({ dish, qty }) => (
                <li key={dish.id} className="card cart-item">
                  <Link to={`/menu/${dish.category}/${dish.id}`} className="cart-item__art">{dish.emoji}</Link>
                  <div className="cart-item__info">
                    <h4>{dish.name}</h4>
                    <span className="muted small">{formatPrice(dish.price)} each</span>
                  </div>
                  <div className="qty">
                    <button onClick={() => dispatch(decrement(dish.id))} aria-label="Decrease">−</button>
                    <span>{qty}</span>
                    <button onClick={() => dispatch(increment(dish.id))} aria-label="Increase">+</button>
                  </div>
                  <strong className="cart-item__price">{formatPrice(dish.price * qty)}</strong>
                  <button className="icon-btn" onClick={() => dispatch(removeFromCart(dish.id))} aria-label={`Remove ${dish.name}`}>🗑️</button>
                </li>
              ))}
            </ul>

            <aside className="card pad summary">
              <h3>Order summary</h3>
              <div className="summary__row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="summary__row"><span>GST (5%)</span><span>{formatPrice(gst)}</span></div>
              <div className="summary__row"><span>Delivery</span><span>{delivery === 0 ? "Free" : formatPrice(delivery)}</span></div>
              {delivery > 0 && <p className="muted small">Add {formatPrice(500 - subtotal)} more for free delivery.</p>}
              <div className="summary__row summary__total"><span>Total</span><span>{formatPrice(total)}</span></div>
              <button className="btn btn-block" onClick={placeOrder}>Place order</button>
              <button className="link-btn" onClick={() => dispatch(clearCart())}>Clear cart</button>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
