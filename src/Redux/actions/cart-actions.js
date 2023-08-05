import axios from "axios";
import Endpoints from "../../apis/Endpoints";
import { ActionTypes } from "../constants/action-types"

export const addToCart = (product) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: product
  }

}


export const fetchProductDataForCartItems = (cartItems) => {
  return async (dispatch) => {
    try {
      // Make API calls to fetch product data for each product ID
      const productDataPromises = cartItems.map((item) =>
        axios.get(Endpoints.PRODUCTS_URL + item.id)
      );

      // Wait for all API calls to resolve
      const productDataResponses = await Promise.all(productDataPromises);

      // Extract the data from the API responses
      const productsWithData = productDataResponses.map((response) => response.data);

      // Update the Redux store with the fetched product data
      dispatch({
        type: ActionTypes.FETCH_PRODUCT_DATA_SUCCESS,
        payload: productsWithData,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.FETCH_PRODUCT_DATA_FAILURE,
        payload: error.message,
      });
    }
  };
};


export const removeFromCart = (productId) => {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: productId,
  };
};


export const updateCartItemQuantity = (productId, newQuantity) => {
  return {
    type: ActionTypes.UPDATE_CART_ITEM_QUANTITY,
    payload: {
      productId,
      newQuantity,
    },
  };
};



export const resetCart = () => {
  return {
    type: ActionTypes.RESET_CART,
  };
};
