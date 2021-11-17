import {
  ADD_CATEGORY_MODAL_TOGGLE,
  CATEGORY_ADD,
  CATEGORY_REMOVE,
  CATEGORY_UPDATE,
  EDIT_CATEGORY_MODAL_TOGGLE,
  GET_CATEGORY,
  UPDATE_BLOG,
} from "../../Constants/Types";

const initialState = {
  categories: [],
  selected_category: {},
  category_add_modal: false,
  category_edit_modal: false,
  loading: true,
};

const CategoryAdmin = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CATEGORY_MODAL_TOGGLE:
      return {
        ...state,
        category_add_modal: !state.category_add_modal,
        loading: false,
      };
    case EDIT_CATEGORY_MODAL_TOGGLE:
      return {
        ...state,
        category_edit_modal: !state.category_edit_modal,
        selected_category: {
          ...state.categories.filter((item) => item._id === payload)[0],
        },
        loading: false,
      };
    case GET_CATEGORY:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case CATEGORY_UPDATE:
      let list = [
        ...state.categories.map((item) =>
          item._id === payload._id ? payload : item
        ),
      ];
      return {
        ...state,
        categories: list,
        loading: false,
      };
    case CATEGORY_ADD:
      return {
        ...state,
        categories: [...state.categories, { ...payload }],
        loading: false,
      };
    case CATEGORY_REMOVE:
      return {
        ...state,
        categories: state.categories.filter((item) => item._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};

export default CategoryAdmin;
