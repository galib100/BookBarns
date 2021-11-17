import axios from "axios";
import {
  BEST_SELLER_ADD,
  BEST_SELLER_ERROR,
  BEST_SELLER_MODAL_TOGGLE,
  BEST_SELLER_REMOVE,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";

export const bestSellerModalToggleAction = (bookId) => (dispatch) => {
  if (bookId) {
    //console.log(bookId);
    dispatch({
      type: BEST_SELLER_MODAL_TOGGLE,
      payload: bookId,
    });
  } else {
    dispatch({
      type: BEST_SELLER_MODAL_TOGGLE,
    });
  }
};

//ADD BEST SELLER
export const bestSellerAdd = (bookId) => async (dispatch) => {
  if (bookId) {
    //console.log(bookId);
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/admin/best-seller/add/${bookId}`
      );
      if (res.data) {
        dispatch({
          type: BEST_SELLER_ADD,
          payload: bookId,
        });
      } else {
        dispatch({
          type: BEST_SELLER_ERROR,
        });
        console.log(res);
      }
    } catch (error) {
      dispatch({
        type: BEST_SELLER_ERROR,
      });
      console.log(error);
    }
  } else {
    dispatch({
      type: BEST_SELLER_ERROR,
    });
  }
};

//REMOVE BEST SELLER
export const bestSellerRemove = (bookId) => async (dispatch) => {
  if (bookId) {
    //console.log(bookId);
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/admin/best-seller/remove/${bookId}`
      );
      if (res.data.removed === "success") {
        dispatch({
          type: BEST_SELLER_REMOVE,
          payload: bookId,
        });
        return true;
      } else {
        dispatch({
          type: BEST_SELLER_ERROR,
        });
        console.log(res);
      }
    } catch (error) {
      dispatch({
        type: BEST_SELLER_ERROR,
      });
      console.log(error);
    }
  } else {
    dispatch({
      type: BEST_SELLER_ERROR,
    });
  }
  return false;
};

//EDIT BEST SELLER
export const bestSellerEdit = (oldBook, newBook) => async (dispatch) => {
  if (oldBook && newBook) {
    //console.log(oldBook, newBook);
    dispatch(bestSellerRemove(oldBook));
    dispatch(bestSellerAdd(newBook));
    return true;
  }
  return false;
};
