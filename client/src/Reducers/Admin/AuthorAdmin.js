import {
  ADD_AUTHOR_MODAL_TOGGLE,
  CREATE_AUTHOR,
  DELETE_AUTHOR,
  GET_AUTHOR,
} from "../../Constants/Types";

const initialState = {
  authors: [],
  author_add_modal: false,
  loading: true,
};

const AuthorAdmin = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_AUTHOR_MODAL_TOGGLE:
      return {
        ...state,
        author_add_modal: !state.author_add_modal,
        loading: false,
      };

    case GET_AUTHOR:
      return {
        ...state,
        authors: payload,
        loading: false,
      };

    case CREATE_AUTHOR:
      return {
        ...state,
        authors: [...state.authors, { ...payload }],
        loading: false,
      };
    case DELETE_AUTHOR:
      return {
        ...state,
        authors: state.authors.filter((item) => item._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};

export default AuthorAdmin;
