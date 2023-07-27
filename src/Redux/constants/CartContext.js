// CartContext.js
import { createContext, useReducer } from "react";
import { cartReducer } from "./CartReducer";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialCartState = {
    cartItems: [],
  };

  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
