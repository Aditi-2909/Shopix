import { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("shopnest-cart");
      return saved? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shopnest-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exist = prev.find(p => p.productId === product.productId);
      if (exist) {
        return prev.map(p => p.productId === product.productId? {...p, qty: p.qty + 1 } : p);
      }
      return [...prev, {...product, qty: 1 }];
    });
  };

  const handleUpdateQty = (item, newQty) => {
    if (newQty < 1) {
      handleRemove(item.productId);
      return;
    }
    setCartItems(prev =>
      prev.map(p => p.productId === item.productId? {...p, qty: newQty } : p)
    );
  };

  const handleRemove = (productId) => {
    setCartItems(prev => prev.filter(p => p.productId!== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, handleUpdateQty, handleRemove }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook - jate import error na hoy
export const useCart = () => {
  return useContext(CartContext);
};

export default CartContext;