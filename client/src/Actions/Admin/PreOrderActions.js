import axios from "axios";
import {
  PRE_ORDER_ADD,
  PRE_ORDER_ERROR,
  PRE_ORDER_MODAL_TOGGLE,
  PRE_ORDER_REMOVE,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";

export const preOrderModalToggleAction = (bookId) => (dispatch) => {
  if (bookId) {
    //console.log(bookId);
    dispatch({
      type: PRE_ORDER_MODAL_TOGGLE,
      payload: bookId,
    });
  } else {
    dispatch({
      type: PRE_ORDER_MODAL_TOGGLE,
    });
  }
};

//ADD PRE ORDER
export const preOrderAdd = (bookId) => async (dispatch) => {
  if (bookId) {
    console.log(bookId);
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/admin/pre-order/add/${bookId}`
      );
      if (res.data) {
        dispatch({
          type: PRE_ORDER_ADD,
          payload: bookId,
        });
      } else {
        dispatch({
          type: PRE_ORDER_ERROR,
        });
        console.log(res);
      }
    } catch (error) {
      dispatch({
        type: PRE_ORDER_ERROR,
      });
      console.log(error);
    }
  } else {
    dispatch({
      type: PRE_ORDER_ERROR,
    });
  }
};

//REMOVE PRE ORDER
export const preOrderRemove = (bookId) => async (dispatch) => {
  if (bookId) {
    //console.log(bookId);
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/admin/pre-order/remove/${bookId}`
      );
      if (res.data.removed === "success") {
        dispatch({
          type: PRE_ORDER_REMOVE,
          payload: bookId,
        });
        return true;
      } else {
        dispatch({
          type: PRE_ORDER_ERROR,
        });
        console.log(res);
      }
    } catch (error) {
      dispatch({
        type: PRE_ORDER_ERROR,
      });
      console.log(error);
    }
  } else {
    dispatch({
      type: PRE_ORDER_ERROR,
    });
  }
  return false;
};

//EDIT BEST SELLER
export const preOrderEdit = (oldBook, newBook) => async (dispatch) => {
  if (oldBook && newBook) {
    //console.log(oldBook, newBook);
    dispatch(preOrderRemove(oldBook));
    dispatch(preOrderAdd(newBook));
    return true;
  }
  return false;
};
