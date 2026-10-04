import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existItem = state.cartItems.find((x) => x._id === item._id)
      if (existItem) {
        // In a real application, you might want to update the quantity instead
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
      } else {
        state.cartItems = [...state.cartItems, item]
      }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((x) => x._id !== itemId)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    clearCart: (state) => {
      state.cartItems = []
      localStorage.removeItem('cartItems')
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer