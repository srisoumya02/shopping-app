import { ActionTypes } from "../constants/action-types"

const initialState = {
    numberCart: 0,
    Carts: [],
    productData: [],
}

export const cartReducer = (state = initialState, { type, payload }) => {
 
    switch (type) {
        case ActionTypes.GET_NUMBER_CART:
            return {
                ...state
            };
            case ActionTypes.ADD_TO_CART:
                const existingItem = state.Carts.find((item) => item._id === payload._id);
              
                if (existingItem) {
                  state.Carts.forEach((item) => {
                    if (item._id === payload._id) {
                      item.quantity++;
                    }
                  });
                  return {
                    ...state,
                    numberCart: state.numberCart + 1,
                  };
                } else {
                  const newItem = {
                    ...payload, // payload should contain the complete product data
                    quantity: 1,
                  };
                  return {
                    ...state,
                    Carts: [...state.Carts, newItem],
                    numberCart: state.numberCart + 1,
                  };
                }
              

        case ActionTypes.FETCH_PRODUCT_DATA_SUCCESS:
            return {
                ...state,
                productData: payload,
            };

        default:
            return state;
    }
};
