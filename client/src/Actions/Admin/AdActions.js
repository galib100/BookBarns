import {
  GET_ADS,
  AD_ADD,
  AD_ERROR,
  AD_MODAL_TOGGLE,
  AD_REMOVE,
  AD_UPDATE,
  GET_ADS_FRONT,
} from "../../Constants/Types";
import axios from "axios";
import { BASE_URL } from "../../Constants/URL";

export const adModalToggleAction = (carouselId) => (dispatch) => {
  if (carouselId) {
    dispatch({
      type: AD_MODAL_TOGGLE,
      payload: carouselId,
    });
  } else {
    dispatch({
      type: AD_MODAL_TOGGLE,
    });
  }
};

//FETCH AD
export const getAds = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/admin/ad`);
    //console.log(res.data);
    dispatch({
      type: GET_ADS,
      payload: res.data.reverse(),
    });
  } catch (error) {
    dispatch({
      type: AD_ERROR,
    });
    //console.log(error);
  }
};
//FETCH AD FRONTEND
export const getAdsFrontend = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/admin/ad`);
    //console.log(res.data);
    dispatch({
      type: GET_ADS_FRONT,
      payload: res.data.reverse(),
    });
  } catch (error) {
    dispatch({
      type: AD_ERROR,
    });
    //console.log(error);
  }
};

//Add AD
export const addAd = (values, selectedFile) => async (dispatch) => {
  let formData = new FormData();

  formData.append("link", values.caption);
  formData.append("adImage", selectedFile);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const res = await axios.post(`${BASE_URL}/api/admin/ad`, formData, config);

    dispatch({
      type: AD_ADD,
      payload: res.data,
    });
    //console.log(res.data);
    return true;
  } catch (err) {
    dispatch({
      type: AD_ERROR,
    });
    return false;
  }
};

//DELETE ADs
export const deleteAd = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/admin/ad/${id}`);
    //console.log(res.data);
    if (res.data.delete === "success") {
      dispatch({
        type: AD_REMOVE,
        payload: id,
      });
      return true;
    } else {
      dispatch({
        type: AD_ERROR,
      });
    }
  } catch (error) {
    dispatch({
      type: AD_ERROR,
    });
    //console.log(error);
  }
  return false;
};

//EDIT AD
export const editAd = (values, selectedFile, id) => async (dispatch) => {
  let formData = new FormData();

  formData.append("link", values.caption);
  if (selectedFile) {
    formData.append("adImage", selectedFile);
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const res = await axios.patch(
      `${BASE_URL}/api/admin/ad/${id}`,
      formData,
      config
    );
    //console.log(res.data);
    dispatch({
      type: AD_UPDATE,
      payload: res.data,
    });
    return true;
  } catch (err) {
    dispatch({
      type: AD_ERROR,
    });
    return false;
  }
};
