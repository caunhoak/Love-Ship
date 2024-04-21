import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <CartContext.Provider value={{ cartId, setCartId, userId, setUserId }}>
      {children}
    </CartContext.Provider>
  );
};
