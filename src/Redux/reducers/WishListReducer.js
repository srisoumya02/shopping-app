import { ActionTypes } from "../constants/action-types";

const initialState = {};

export const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_WISHLIST:
      const productIdToAdd = action.payload;
      console.log(productIdToAdd)
      return {
        ...state,
        [productIdToAdd]: true,
      };
    case ActionTypes.REMOVE_FROM_WISHLIST:
      const productIdToRemove = action.payload;
      const { [productIdToRemove]: removedProduct, ...updatedState } = state;
      return updatedState;
    default:
      return state;
  }
};
