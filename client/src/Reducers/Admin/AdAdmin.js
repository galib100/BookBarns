import {
  GET_ADS,
  AD_ADD,
  AD_REMOVE,
  AD_MODAL_TOGGLE,
  AD_UPDATE,
  GET_ADS_FRONT,
} from "../../Constants/Types";

const initialState = {
  ads: [],
  ad_modal: false,
  ad_item: {},
  loading: true,
};

const AdAdmin = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ADS:
      return {
        ...state,
        ads: [...payload],
        loading: false,
      };
    case GET_ADS_FRONT:
      return {
        ...state,
        ads: [...payload],
        loading: false,
      };

    case AD_MODAL_TOGGLE:
      let modal_data = {};
      if (payload) {
        modal_data = {
          ...state.ads.filter((item) => item._id === payload)[0],
        };
      }
      return {
        ...state,
        loading: false,
        ad_modal: !state.ad_modal,
        ad_item: { ...modal_data },
      };
    case AD_ADD:
      return {
        ...state,
        loading: false,
        ads: [payload, ...state.ads],
      };
    case AD_REMOVE:
      return {
        ...state,
        loading: false,
        ads: [...state.ads.filter((item) => item._id !== payload)],
      };
    case AD_UPDATE:
      let newUpdate = [
        ...state.ads.map((item) => {
          return item._id === payload._id ? { ...payload } : item;
        }),
      ];
      return {
        ...state,
        ads: [...newUpdate],
        ad_item: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default AdAdmin;
