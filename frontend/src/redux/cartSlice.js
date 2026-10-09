import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("shopnest-cart") || "[]"),
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find(p => p.productId === item.productId);
      if (exist) {
        state.cartItems = state.cartItems.map(p =>
          p.productId === item.productId ? { ...p, qty: p.qty + (item.qty || 1) } : p
        );
      } else {
        state.cartItems.push({ ...item, qty: item.qty || 1 });
      }
      localStorage.setItem("shopnest-cart", JSON.stringify(state.cartItems));
    },
    updateQty: (state, action) => {
      const { productId, qty } = action.payload;
      if (qty < 1) {
        state.cartItems = state.cartItems.filter(p => p.productId !== productId);
      } else {
        state.cartItems = state.cartItems.map(p => p.productId === productId ? { ...p, qty } : p);
      }
      localStorage.setItem("shopnest-cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(p => p.productId !== action.payload);
      localStorage.setItem("shopnest-cart", JSON.stringify(state.cartItems));
    },
    // NEW - eta add kor
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("shopnest-cart");
    }
  },
});

export const { addToCart, updateQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;