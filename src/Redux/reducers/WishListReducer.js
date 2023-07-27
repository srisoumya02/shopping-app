

const initialState = {};

export const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        [action.productId]: true,
      };
    case 'REMOVE_FROM_WISHLIST':
      const newState = { ...state };
      delete newState[action.productId];
      return newState;
    default:
      return state;
  }
};

