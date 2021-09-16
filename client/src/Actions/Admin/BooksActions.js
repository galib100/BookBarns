import { GET_BOOK } from "../../Constants/Types";
import data from "../../Components/Admin/data/books";

export const getBook = (bookId) => (dispatch) => {
  let selectedBook = data.filter((item) => item.id === parseInt(bookId))[0];
  console.log(selectedBook);
  if (selectedBook) {
    console.log("in");
    dispatch({
      type: GET_BOOK,
      payload: selectedBook,
    });
    return true;
  } else {
    return false;
  }
};
