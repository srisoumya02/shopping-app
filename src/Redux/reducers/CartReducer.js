import { ActionTypes } from "../constants/action-types"

const initialState = {
  numberCart: 0,
  Carts: [],
  productData: [],
}

export const cartReducer = (state = initialState, { type, payload }) => {
  console.log(state)
  console.log(payload)

  switch (type) {
    case ActionTypes.GET_NUMBER_CART:
      return {
        ...state
      };
      case ActionTypes.ADD_TO_CART:
  // Check if the product is already in the cart
  const existingItem = state.Carts.find(item => item._id === payload._id);
 
  if (existingItem) {
    // If the product exists, update its quantity using map
    console.log(existingItem._id);
    console.log(payload._id);
    return {
      ...state,
      Carts: state.Carts.map(item =>
    
        item._id === payload._id ? { ...item, quantity: item.quantity + 1 } : item
      ),
      numberCart: state.numberCart + 1,
    };
  } else {
    // If the product is not in the cart, add it
    const newItem = {
      ...payload,
      quantity: 1,
    };
    console.log(newItem)
    console.log(state)
    console.log(payload)
    return {
      ...state,
      Carts: [...state.Carts, newItem],
      numberCart: state.numberCart + 1,
    };
  }

    case ActionTypes.FETCH_PRODUCT_DATA_SUCCESS:
      console.log(state);
 

      return {
        ...state,
        productData: payload,
      };
     
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        Carts: state.Carts.filter((item) => item._id !== payload),
        numberCart: state.numberCart - 1,
      };
    default:
      return state;
  }
};
