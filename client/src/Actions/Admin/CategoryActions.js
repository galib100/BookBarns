import axios from "axios";
import {
  ADD_CATEGORY_MODAL_TOGGLE,
  CATEGORY_ADD,
  CATEGORY_ERROR,
  CATEGORY_REMOVE,
  CATEGORY_UPDATE,
  EDIT_CATEGORY_MODAL_TOGGLE,
  GET_CATEGORY,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";

//ADD Category modal
export const addCategoryModalToggleAction = () => (dispatch) => {
  dispatch({
    type: ADD_CATEGORY_MODAL_TOGGLE,
  });
};
//EDIT Category modal
export const editCategoryModalToggleAction = (id) => (dispatch) => {
  dispatch({
    type: EDIT_CATEGORY_MODAL_TOGGLE,
    payload: id,
  });
};

//FETCH Category
export const getCategory = () => async (dispatch) => {
  const res = await axios.get(`${BASE_URL}/api/admin/allCategory`);
  //console.log(res.data);
  dispatch({
    type: GET_CATEGORY,
    payload: res.data,
  });
};

//DELETE Category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/api/admin/deleteSpecificCategory/${id}`
    );
    //console.log(res);
    if (res.data.delete) {
      dispatch({
        type: CATEGORY_REMOVE,
        payload: id,
      });
      return true;
    } else {
      dispatch({
        type: CATEGORY_ERROR,
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: CATEGORY_ERROR,
    });
    console.log(error);
    return false;
  }
};

//Add Category
export const addCategory = (name) => async (dispatch) => {
  let formData = {
    newCategory: name,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/api/admin/addNewCategory`,
      JSON.stringify(formData),
      config
    );
    if (res.data) {
      dispatch({
        type: CATEGORY_ADD,
        payload: res.data,
      });
      return true;
    }
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
    });
    return false;
  }
};

//EDIT Category
export const editCategory = (values, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const formData = {
    subcategory: values,
  };
  try {
    const res = await axios.patch(
      `${BASE_URL}/api/admin/chAcategory/${id}`,
      JSON.stringify(formData),
      config
    );

    dispatch({
      type: CATEGORY_UPDATE,
      payload: res.data,
    });
    //console.log(res.data);
    return true;
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
    });
    return false;
  }
};
