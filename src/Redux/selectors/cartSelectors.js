
import { createSelector } from 'reselect';

// Select the cart state from the Redux store
const selectCartState = (state) => state.cart;
export const selectCartNumber = (state) => state.cart.numberCart;


export const selectCartItems =(state)=>state.cart.Carts

export const selectProductData = (state) => state.cart.productData;




