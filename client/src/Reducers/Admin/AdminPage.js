import {
  SIDEBAR_TOGGLE,
  BLOG_MODAL_TOGGLE,
  BEST_SELLER_MODAL_TOGGLE,
  NEW_ARRIVALS_MODAL_TOGGLE,
  ON_SALE_MODAL_TOGGLE,
  PRE_ORDER_MODAL_TOGGLE,
  HERO_CAROUSEL_MODAL_TOGGLE,
  TRENDING_MODAL_TOGGLE,
} from "../../Constants/Types";

const initialState = {
  sidebar_open: false,
  blog_modal: false,
  best_seller_modal: false,
  trending_modal: false,
  new_arrivals_modal: false,
  on_sale_modal: false,
  pre_order_modal: false,
  hero_carousel_modal: false,
  best_seller_book: {},
  trending_book: {},
  new_arrivals_book: {},
  on_sale_book: {},
  hero_carousel_item: {},
  pre_order_book: {},
};

const AdminPages = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebar_open: !state.sidebar_open,
      };
    case BLOG_MODAL_TOGGLE:
      return {
        ...state,
        blog_modal: !state.blog_modal,
      };
    case BEST_SELLER_MODAL_TOGGLE:
      return {
        ...state,
        best_seller_modal: !state.best_seller_modal,
        best_seller_book: { ...payload },
      };
    case TRENDING_MODAL_TOGGLE:
      return {
        ...state,
        trending_modal: !state.trending_modal,
        trending_book: { ...payload },
      };
    case NEW_ARRIVALS_MODAL_TOGGLE:
      return {
        ...state,
        new_arrivals_modal: !state.new_arrivals_modal,
        new_arrivals_book: { ...payload },
      };
    case ON_SALE_MODAL_TOGGLE:
      return {
        ...state,
        on_sale_modal: !state.on_sale_modal,
        on_sale_book: { ...payload },
      };
    case PRE_ORDER_MODAL_TOGGLE:
      return {
        ...state,
        pre_order_modal: !state.pre_order_modal,
        pre_order_book: { ...payload },
      };
    case HERO_CAROUSEL_MODAL_TOGGLE:
      return {
        ...state,
        hero_carousel_modal: !state.hero_carousel_modal,
        hero_carousel_item: { ...payload },
      };

    default:
      return state;
  }
};

export default AdminPages;
