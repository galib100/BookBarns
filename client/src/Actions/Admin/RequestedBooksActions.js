import axios from "axios";
import {
  DELETE_REQUESTED_BOOK,
  GET_REQUESTED_BOOK,
  REQUESTED_BOOK_ERROR,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";

//FETCH REQUESTED BOOKS
export const getRequestedBooks = () => async (dispatch) => {
  const res = await axios.get(`${BASE_URL}/api/requested-books`);
  //console.log(res.data);
  dispatch({
    type: GET_REQUESTED_BOOK,
    payload: res.data,
  });
};

//DELETE BOOK
export const deleteRequestedBook = (bookId) => async (dispatch) => {
  const res = await axios.delete(
    `${BASE_URL}/api/admin/delete-specefic-req-book/${bookId}`
  );
  console.log(res);
  if (res.data.delete === "success") {
    dispatch({
      type: DELETE_REQUESTED_BOOK,
      payload: bookId,
    });
    return true;
  } else {
    dispatch({
      type: REQUESTED_BOOK_ERROR,
    });
    return false;
  }
};
