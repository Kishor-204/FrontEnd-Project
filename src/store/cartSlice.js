import { createSlice } from "@reduxjs/toolkit";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem("sr-cart")) || [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: load() }, // [{ id, qty }]
  reducers: {
    addToCart(state, { payload }) {
      const { id, qty = 1 } = payload;
      const line = state.items.find((i) => i.id === id);
      if (line) line.qty += qty;
      else state.items.push({ id, qty });
    },
    increment(state, { payload: id }) {
      const line = state.items.find((i) => i.id === id);
      if (line) line.qty += 1;
    },
    decrement(state, { payload: id }) {
      const line = state.items.find((i) => i.id === id);
      if (!line) return;
      if (line.qty > 1) line.qty -= 1;
      else state.items = state.items.filter((i) => i.id !== id);
    },
    removeFromCart(state, { payload: id }) {
      state.items = state.items.filter((i) => i.id !== id);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, increment, decrement, removeFromCart, clearCart } = cartSlice.actions;
export const selectCartCount = (state) => state.cart.items.reduce((sum, i) => sum + i.qty, 0);
export default cartSlice.reducer;
