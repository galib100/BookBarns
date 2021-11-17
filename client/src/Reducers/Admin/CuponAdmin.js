import {
  ADD_CUPON_MODAL_TOGGLE,
  CUPON_ADD,
  CUPON_REMOVE,
  CUPON_UPDATE,
  EDIT_CUPON_MODAL_TOGGLE,
  GET_CUPON,
} from "../../Constants/Types";

const initialState = {
  cupons: [],
  selected_cupon: {},
  cupon_add_modal: false,
  cupon_edit_modal: false,
  loading: true,
};

const CategoryAdmin = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CUPON_MODAL_TOGGLE:
      return {
        ...state,
        cupon_add_modal: !state.cupon_add_modal,
        loading: false,
      };
    case EDIT_CUPON_MODAL_TOGGLE:
      return {
        ...state,
        cupon_edit_modal: !state.cupon_edit_modal,
        selected_cupon: {
          ...state.cupons.filter((item) => item._id === payload)[0],
        },
        loading: false,
      };
    case GET_CUPON:
      return {
        ...state,
        cupons: payload,
        loading: false,
      };
    case CUPON_UPDATE:
      let list = [
        ...state.cupons.map((item) =>
          item._id === payload._id ? payload : item
        ),
      ];
      return {
        ...state,
        cupons: list,
        loading: false,
      };
    case CUPON_ADD:
      return {
        ...state,
        cupons: [{ ...payload }, ...state.cupons],
        loading: false,
      };
    case CUPON_REMOVE:
      return {
        ...state,
        cupons: state.cupons.filter((item) => item._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};

export default CategoryAdmin;
