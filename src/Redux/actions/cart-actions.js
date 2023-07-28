import axios from "axios";
import { ActionTypes } from "../constants/action-types"

export const addToCart=(product)=>{
    return{
        type: ActionTypes.ADD_TO_CART,
        payload: product
    }
        
}



export const fetchProductDataForCartItems = (cartItems) => {
  return async (dispatch) => {
    try {
      // Your asynchronous API call to fetch product data here...
      // You can use Axios or any other library for the API call.

      const productDataPromises = cartItems.map((item) =>
        axios.get(`https://fakestoreapi.com/products/${item.Id}`)
      );

      const productDataResponses = await Promise.all(productDataPromises);

      const productsWithData = productDataResponses.map((response, index) => ({
        ...response.data,
        quantity: cartItems[index].quantity,
      }));

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
