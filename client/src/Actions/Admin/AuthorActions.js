import axios from "axios";
import {
  ADD_AUTHOR_MODAL_TOGGLE,
  CREATE_AUTHOR,
  AUTHOR_ERROR,
  DELETE_AUTHOR,
  GET_AUTHOR,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";

//ADD Author modal
export const addAuthorModalToggleAction = () => (dispatch) => {
  dispatch({
    type: ADD_AUTHOR_MODAL_TOGGLE,
  });
};

//FETCH Author
export const getAuthor = () => async (dispatch) => {
  const res = await axios.get(`${BASE_URL}/api/admin/allAuthor`);
  //console.log(res.data);
  function compare(a, b) {
    if (a.author < b.author) {
      return -1;
    }
    if (a.author > b.author) {
      return 1;
    }
    return 0;
  }
  res.data.sort(compare);
  dispatch({
    type: GET_AUTHOR,
    payload: res.data,
  });
};

//DELETE Author
export const deleteAuthor = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/api/admin/deleteSpecificAuthor/${id}`
    );
    //console.log(res);
    if (res.data.delete) {
      dispatch({
        type: DELETE_AUTHOR,
        payload: id,
      });
      return true;
    } else {
      dispatch({
        type: AUTHOR_ERROR,
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: AUTHOR_ERROR,
    });
    console.log(error);
    return false;
  }
};

//Add Category
export const addAuthor = (name) => async (dispatch) => {
  let formData = {
    newAuthor: name,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/api/admin/addNewAuthor`,
      JSON.stringify(formData),
      config
    );
    if (res.data) {
      dispatch({
        type: CREATE_AUTHOR,
        payload: res.data,
      });
      return true;
    }
  } catch (err) {
    dispatch({
      type: AUTHOR_ERROR,
    });
    return false;
  }
};
