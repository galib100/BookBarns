import axios from "axios";
import {
  NEW_ARRIVALS_ADD,
  NEW_ARRIVALS_ERROR,
  NEW_ARRIVALS_MODAL_TOGGLE,
  NEW_ARRIVALS_REMOVE,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";

export const newArrivalsModalToggleAction = (bookId) => (dispatch) => {
  if (bookId) {
    console.log(bookId);
    dispatch({
      type: NEW_ARRIVALS_MODAL_TOGGLE,
      payload: bookId,
    });
  } else {
    dispatch({
      type: NEW_ARRIVALS_MODAL_TOGGLE,
    });
  }
};

//ADD NEW ARRIVAL
export const newArrivalAdd = (bookId) => async (dispatch) => {
  if (bookId) {
    //console.log(bookId);
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/admin/new-arrival/add/${bookId}`
      );
      if (res.data) {
        dispatch({
          type: NEW_ARRIVALS_ADD,
          payload: bookId,
        });
      } else {
        dispatch({
          type: NEW_ARRIVALS_ERROR,
        });
        console.log(res);
      }
    } catch (error) {
      dispatch({
        type: NEW_ARRIVALS_ERROR,
      });
      console.log(error);
    }
  } else {
    dispatch({
      type: NEW_ARRIVALS_ERROR,
    });
  }
};

//REMOVE NEW ARRIVAL
export const newArrivalRemove = (bookId) => async (dispatch) => {
  if (bookId) {
    console.log(bookId);
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/admin/new-arrival/remove/${bookId}`
      );
      if (res.data.removed === "success") {
        dispatch({
          type: NEW_ARRIVALS_REMOVE,
          payload: bookId,
        });
        return true;
      } else {
        dispatch({
          type: NEW_ARRIVALS_ERROR,
        });
        console.log(res);
      }
    } catch (error) {
      dispatch({
        type: NEW_ARRIVALS_ERROR,
      });
      console.log(error);
    }
  } else {
    dispatch({
      type: NEW_ARRIVALS_ERROR,
    });
  }
  return false;
};

//EDIT NEW ARRIVAL
export const newArrivalEdit = (oldBook, newBook) => async (dispatch) => {
  if (oldBook && newBook) {
    //console.log(oldBook, newBook);
    dispatch(newArrivalRemove(oldBook));
    dispatch(newArrivalAdd(newBook));
    return true;
  }
  return false;
};
