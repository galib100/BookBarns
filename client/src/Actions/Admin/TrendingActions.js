import axios from "axios";
import {
  TRENDING_ADD,
  TRENDING_ERROR,
  TRENDING_MODAL_TOGGLE,
  TRENDING_REMOVE,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";

export const trendingModalToggleAction = (bookId) => (dispatch) => {
  if (bookId) {
    console.log(bookId);
    dispatch({
      type: TRENDING_MODAL_TOGGLE,
      payload: bookId,
    });
  } else {
    dispatch({
      type: TRENDING_MODAL_TOGGLE,
    });
  }
};

//ADD TRENDING
export const trendingAdd = (bookId) => async (dispatch) => {
  if (bookId) {
    console.log(bookId);
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/admin/trending/add/${bookId}`
      );
      if (res.data) {
        dispatch({
          type: TRENDING_ADD,
          payload: bookId,
        });
      } else {
        dispatch({
          type: TRENDING_ERROR,
        });
        console.log(res);
      }
    } catch (error) {
      dispatch({
        type: TRENDING_ERROR,
      });
      console.log(error);
    }
  } else {
    dispatch({
      type: TRENDING_ERROR,
    });
  }
};

//REMOVE TRENDING
export const trendingRemove = (bookId) => async (dispatch) => {
  if (bookId) {
    console.log(bookId);
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/admin/trending/remove/${bookId}`
      );
      if (res.data.removed === "success") {
        dispatch({
          type: TRENDING_REMOVE,
          payload: bookId,
        });
        return true;
      } else {
        dispatch({
          type: TRENDING_ERROR,
        });
        console.log(res);
      }
    } catch (error) {
      dispatch({
        type: TRENDING_ERROR,
      });
      console.log(error);
    }
  } else {
    dispatch({
      type: TRENDING_ERROR,
    });
  }
  return false;
};

//EDIT TRENDING
export const trendingEdit = (oldBook, newBook) => async (dispatch) => {
  if (oldBook && newBook) {
    //console.log(oldBook, newBook);
    dispatch(trendingRemove(oldBook));
    dispatch(trendingAdd(newBook));
    return true;
  }
  return false;
};
