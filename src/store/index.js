import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: { cart: cartReducer },
});

// Persist the cart between visits
store.subscribe(() => {
  try {
    localStorage.setItem("sr-cart", JSON.stringify(store.getState().cart.items));
  } catch {
    /* ignore */
  }
});
