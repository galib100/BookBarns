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

const initialState = {
  cart: [],
  wishlist: [],
  books: [],
  categoriesOfBooks: [],
  filteredSavedBooks: {},
  total: 0,
};

const BookController = (state = initialState, action) => {
  switch (action.type) {
    //////////////////////////////////////////////////////////
    case ADD_TO_CART:
      let found = false;
      //Check book is in cart then incrase the amount?
      state.cart.map((book) => {
        if (book._id === action.item._id) {
          found = true;
        }
      });
      //If it is not found the add to basket
      if (!found) {
        return {
          ...state,
          cart: [...state.cart, { ...action.item }],
        };
      } else {
        return state;
      }

    ////////////////////////////////////////////////////////////////
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((value) => {
          return value._id !== action.itemId;
        }),
      };

    ////////////////////////////////////////////////////////////////
    case CLEAR_CART:
      return{
        ...state,
        cart: [],
      }

    ////////////////////////////////////////////////////////////////
    case ADD_TO_WISHLIST:
      //   remove if it already in the list
      let f = false;
      state.wishlist.map((book) => {
        if (book._id === action.item._id) {
          f = true;
        }
      });
      //If it is not found the add to basket
      if (!f) {
        const updateWishlist = [...state.wishlist, { ...action.item }];
        localStorage.setItem('viewer_wishlist', JSON.stringify(updateWishlist));
        return {
          ...state,
          wishlist: updateWishlist,
        };
      } else {
        localStorage.setItem('viewer_wishlist', JSON.stringify(state.wishlist));
        return state;
      }

    ////////////////////////////////////////////////////////////////
    case REMOVE_FROM_WISHLIST:
      const updateWishlist = state.wishlist.filter((value) => { return value._id !== action.itemId; });
      localStorage.setItem('viewer_wishlist', JSON.stringify(updateWishlist));
      return {
        ...state,
        wishlist: updateWishlist,
      };

    ////////////////////////////////////////////////////////////////
    case UPDATE_WISHLIST:
      const wl = JSON.parse(localStorage.getItem("viewer_wishlist"));
      return {
        ...state,
        wishlist: wl,
      };

    ////////////////////////////////////////////////////////////////
    case SAVE_BOOKS:
      return {
        ...state,
        books: action.books,
      };
    ////////////////////////////////////////////////////////////////
    case FILTER_CATEGORIES:
      const catArray = action.books;
      let cataOfBooks = [];
      catArray.map((val) => {
        const obj = { category: val.category, subCategory: val.subcategory };
        cataOfBooks.push(obj);
      });
      return {
        ...state,
        categoriesOfBooks: cataOfBooks,
      };
    ////////////////////////////////////////////////////////////////
    case FILTER_BOOKS:
      const bsetSellerBooks = action.books.filter(
        (book) => book.bestSeller === true
      );
      const newArrivalBooks = action.books.filter(
        (book) => book.newArrivals === true
      );
      const preRrderBooks = action.books.filter(
        (book) => book.preOrderList === true
      );
      const trendingBooks = action.books.filter(
        (book) => book.trending === true
      );
      const extraDiscountBooks = action.books.filter(
        (book) => book.discount > 0
      );

      const fsb = {
        bestSeller: bsetSellerBooks,
        newArrival: newArrivalBooks,
        preOrders: preRrderBooks,
        trending: trendingBooks,
        extraDiscount: extraDiscountBooks,
      };

      return {
        ...state,
        filteredSavedBooks: fsb,
      };
    ////////////////////////////////////////////////////////////////
    default:
      return state;
  }
};

export default BookController;
