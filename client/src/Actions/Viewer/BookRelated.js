import {
  ADD_TO_CART,
  ADD_TO_WISHLIST,
  CLEAR_CART,
  FILTER_BOOKS,
  FILTER_CATEGORIES,
  REMOVE_FROM_CART,
  REMOVE_FROM_WISHLIST,
  SAVE_BOOKS,
  UPDATE_WISHLIST,
} from "../../Constants/Types";

// ADD TO CART
export const addToCart = (book) => {
  return {
    type: ADD_TO_CART,
    item: book,
  };
};

// REMOVE FROM CART
export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    itemId: id,
  };
};

// CLEAR THE CART
export const clearTheCart = () => {
  return {
    type: CLEAR_CART
  }
}

// ADD TO WISHLIST
export const addToWishlist = (book) => {
  return {
    type: ADD_TO_WISHLIST,
    item: book,
  };
};

// REMOVE FROM WISHLIST
export const removeFromWishlist = (id) => {
  return {
    type: REMOVE_FROM_WISHLIST,
    itemId: id,
  };
};

// UPDATE WISHLIST
export const updateStoreForWishlist = () => {
  return {
    type: UPDATE_WISHLIST
  }
}

// SAVE BOOKS
export const saveBooksToStore = (books) => {
  return {
    type: SAVE_BOOKS,
    books: books,
  };
};

// FILTER CATEGORIES
export const saveBooksCategories = (books) => {
  return {
    type: FILTER_CATEGORIES,
    books: books
  }
}

// FILTER BOOKS
export const saveFilteredBooksToStore = (books) => {
  return {
    type: FILTER_BOOKS,
    books: books
  }
}