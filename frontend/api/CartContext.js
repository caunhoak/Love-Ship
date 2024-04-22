import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [storeId, setStoreId] = useState(null);
  const [orderId, setOrderId] = useState(null);

  return (
    <CartContext.Provider
      value={{
        cartId,
        setCartId,
        userId,
        setUserId,
        storeId,
        setStoreId,
        orderId,
        setOrderId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
