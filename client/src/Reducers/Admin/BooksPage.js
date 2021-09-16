import { GET_BOOK } from "../../Constants/Types";

const initialState = {
  selected_book: {},
  loading: true,
};

const BooksPage = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BOOK:
      return {
        ...state,
        selected_book: { ...payload },
        loading: false,
      };

    default:
      return state;
  }
};

export default BooksPage;
