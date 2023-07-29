

export const addToWishlist = (productId) => ({
  type: 'ADD_TO_WISHLIST',
  productId,
});

export const removeFromWishlist = (productId) => ({
  type: 'REMOVE_FROM_WISHLIST',
  productId,
});
