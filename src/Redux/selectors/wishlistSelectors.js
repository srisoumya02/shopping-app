

export const selectWishlistItemsCount = (state) => {
  return Object.values(state.wishlist).filter((isWishlisted) => isWishlisted).length;
};
