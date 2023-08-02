// actions.js

import { ActionTypes } from "../constants/action-types"

// Action creators
export const addToWishlist = (productId) => ({
  type: ActionTypes.ADD_TO_WISHLIST,
  payload: productId,
});

export const removeFromWishlist = (productId) => ({
  type: ActionTypes.REMOVE_FROM_WISHLIST,
  payload: productId,
});
