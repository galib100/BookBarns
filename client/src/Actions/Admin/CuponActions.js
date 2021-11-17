import axios from "axios";
import {
  CUPON_ERROR,
  CUPON_ADD,
  ADD_CUPON_MODAL_TOGGLE,
  EDIT_CUPON_MODAL_TOGGLE,
  GET_CUPON,
  CUPON_REMOVE,
  CUPON_UPDATE,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";

//ADD Cupon modal
export const addCuponModalToggleAction = () => (dispatch) => {
  dispatch({
    type: ADD_CUPON_MODAL_TOGGLE,
  });
};

//EDIT Cupon modal
export const editCuponModalToggleAction = (id) => (dispatch) => {
  dispatch({
    type: EDIT_CUPON_MODAL_TOGGLE,
    payload: id,
  });
};

//FETCH Cupon
export const getCupon = () => async (dispatch) => {
  const res = await axios.get(`${BASE_URL}/api/admin/allCupon`);
  //console.log(res.data);
  dispatch({
    type: GET_CUPON,
    payload: res.data.reverse(),
  });
};

//DELETE Cupon
export const deleteCupon = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/api/admin/deleteSpecificCupon/${id}`
    );
    //console.log(res);
    if (res.data.delete) {
      dispatch({
        type: CUPON_REMOVE,
        payload: id,
      });
      return true;
    } else {
      dispatch({
        type: CUPON_ERROR,
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: CUPON_ERROR,
    });
    console.log(error);
    return false;
  }
};

//Add Cupon
export const addCupon = (values) => async (dispatch) => {
  let formData = {
    cuponcode: values.code,
    cupontype: values.type,
    amount: values.ammount,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/api/admin/addNewCupon`,
      JSON.stringify(formData),
      config
    );
    if (res.data) {
      dispatch({
        type: CUPON_ADD,
        payload: res.data,
      });
      return true;
    }
  } catch (err) {
    dispatch({
      type: CUPON_ERROR,
    });
    return false;
  }
};

//EDIT cupon
export const editCupon = (values, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const formData = {
    cuponcode: values.code,
    cupontype: values.type,
    amount: values.ammount,
  };
  try {
    const res = await axios.patch(
      `${BASE_URL}/api/admin/editSpecificCupon/${id}`,
      JSON.stringify(formData),
      config
    );

    dispatch({
      type: CUPON_UPDATE,
      payload: res.data,
    });
    //console.log(res.data);
    return true;
  } catch (err) {
    dispatch({
      type: CUPON_ERROR,
    });
    return false;
  }
};
