import {
  GET_REQUESTED_BOOK,
  DELETE_REQUESTED_BOOK,
} from "../../Constants/Types";

const initialState = {
  requested_books: [],
  loading: true,
};

const RequestedBookAdmin = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_REQUESTED_BOOK:
      return {
        ...state,
        requested_books: [...payload],
        loading: false,
      };

    case DELETE_REQUESTED_BOOK:
      return {
        ...state,
        requested_books: state.requested_books.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default RequestedBookAdmin;
