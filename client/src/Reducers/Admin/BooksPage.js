import {
  BEST_SELLER_ADD,
  BEST_SELLER_MODAL_TOGGLE,
  BEST_SELLER_REMOVE,
  CREATE_BOOK,
  DELETE_BOOK,
  GET_BOOK,
  LOAD_ADMIN_DATA,
  NEW_ARRIVALS_ADD,
  NEW_ARRIVALS_MODAL_TOGGLE,
  NEW_ARRIVALS_REMOVE,
  ON_SALE_MODAL_TOGGLE,
  PRE_ORDER_ADD,
  PRE_ORDER_MODAL_TOGGLE,
  PRE_ORDER_REMOVE,
  TRENDING_ADD,
  TRENDING_MODAL_TOGGLE,
  TRENDING_REMOVE,
  UPDATE_BOOK,
} from "../../Constants/Types";

const initialState = {
  books: [],
  selected_book: {},
  best_seller_modal: false,
  trending_modal: false,
  new_arrivals_modal: false,
  on_sale_modal: false,
  pre_order_modal: false,
  best_seller_book: {},
  trending_book: {},
  new_arrivals_book: {},
  on_sale_book: {},
  pre_order_book: {},
  loading: true,
};

const BooksPage = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOK:
      const getBookObj = {
        ...state.books.filter((item) => item._id === payload)[0],
      };
      return {
        ...state,
        selected_book: getBookObj,
        loading: false,
      };
    case CREATE_BOOK:
      return {
        ...state,
        books: [payload, ...state.books],
        loading: false,
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((item) => item._id !== payload),
        loading: false,
      };
    case UPDATE_BOOK:
      let updateBooks = [
        ...state.books.map((item) =>
          item._id === payload._id ? payload : item
        ),
      ];
      return {
        ...state,
        books: [...updateBooks],
        loading: false,
      };
    case LOAD_ADMIN_DATA:
      return {
        ...state,
        books: payload,
        loading: false,
      };
    case BEST_SELLER_MODAL_TOGGLE:
      return {
        ...state,
        best_seller_modal: !state.best_seller_modal,
        best_seller_book: state.books.filter((item) => item._id === payload)[0],
      };
    case BEST_SELLER_ADD:
      const newArr = state.books.map((item) => {
        if (item._id === payload) {
          item.bestSeller = true;
        }
        return item;
      });
      return {
        ...state,
        books: [...newArr],
      };
    case BEST_SELLER_REMOVE:
      const newArrRm = state.books.map((item) => {
        if (item._id === payload) {
          item.bestSeller = false;
        }
        return item;
      });
      return {
        ...state,
        books: [...newArrRm],
      };
    case NEW_ARRIVALS_ADD:
      const newArrivalsArr = state.books.map((item) => {
        if (item._id === payload) {
          item.newArrivals = true;
        }
        return item;
      });
      return {
        ...state,
        books: [...newArrivalsArr],
      };
    case NEW_ARRIVALS_REMOVE:
      const newArrivalsArrRm = state.books.map((item) => {
        if (item._id === payload) {
          item.newArrivals = false;
        }
        return item;
      });
      return {
        ...state,
        books: [...newArrivalsArrRm],
      };
    case TRENDING_ADD:
      const trendingArr = state.books.map((item) => {
        if (item._id === payload) {
          item.trending = true;
        }
        return item;
      });
      return {
        ...state,
        books: [...trendingArr],
      };
    case TRENDING_REMOVE:
      const trendingArrRm = state.books.map((item) => {
        if (item._id === payload) {
          item.trending = false;
        }
        return item;
      });
      return {
        ...state,
        books: [...trendingArrRm],
      };
    case PRE_ORDER_ADD:
      const preOrderArr = state.books.map((item) => {
        if (item._id === payload) {
          item.preOrderList = true;
        }
        return item;
      });
      return {
        ...state,
        books: [...preOrderArr],
      };
    case PRE_ORDER_REMOVE:
      const preOrderArrRm = state.books.map((item) => {
        if (item._id === payload) {
          item.preOrderList = false;
        }
        return item;
      });
      return {
        ...state,
        books: [...preOrderArrRm],
      };
    case TRENDING_MODAL_TOGGLE:
      return {
        ...state,
        trending_modal: !state.trending_modal,
        trending_book: state.books.filter((item) => item._id === payload)[0],
      };
    case NEW_ARRIVALS_MODAL_TOGGLE:
      return {
        ...state,
        new_arrivals_modal: !state.new_arrivals_modal,
        new_arrivals_book: state.books.filter(
          (item) => item._id === payload
        )[0],
      };
    case ON_SALE_MODAL_TOGGLE:
      return {
        ...state,
        on_sale_modal: !state.on_sale_modal,
        on_sale_book: state.books.filter((item) => item._id === payload)[0],
      };
    case PRE_ORDER_MODAL_TOGGLE:
      return {
        ...state,
        pre_order_modal: !state.pre_order_modal,
        pre_order_book: state.books.filter((item) => item._id === payload)[0],
      };
    default:
      return state;
  }
};

export default BooksPage;
