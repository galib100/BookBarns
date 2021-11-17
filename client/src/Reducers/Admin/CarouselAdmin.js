import {
  GET_HERO_CAROUSELS,
  HERO_CAROUSEL_ADD,
  HERO_CAROUSEL_MODAL_TOGGLE,
  HERO_CAROUSEL_REMOVE,
  HERO_CAROUSEL_UPDATE,
} from "../../Constants/Types";

const initialState = {
  carousels: [],
  sidebar_open: false,
  hero_carousel_modal: false,
  hero_carousel_item: {},
  loading: true,
};

const CarouselAdmin = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_HERO_CAROUSELS:
      return {
        ...state,
        carousels: [...payload],
        loading: false,
      };

    case HERO_CAROUSEL_MODAL_TOGGLE:
      let modal_data = {};
      if (payload) {
        modal_data = {
          ...state.carousels.filter((item) => item._id === payload)[0],
        };
      }
      return {
        ...state,
        loading: false,
        hero_carousel_modal: !state.hero_carousel_modal,
        hero_carousel_item: { ...modal_data },
      };
    case HERO_CAROUSEL_ADD:
      return {
        ...state,
        loading: false,
        carousels: [payload, ...state.carousels],
      };
    case HERO_CAROUSEL_REMOVE:
      return {
        ...state,
        loading: false,
        carousels: [...state.carousels.filter((item) => item._id !== payload)],
      };
    case HERO_CAROUSEL_UPDATE:
      let newUpdate = [
        ...state.carousels.map((item) => {
          return item._id === payload._id ? { ...payload } : item;
        }),
      ];
      return {
        ...state,
        carousels: [...newUpdate],
        hero_carousel_item: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default CarouselAdmin;
