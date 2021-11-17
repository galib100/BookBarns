import {
  GET_HERO_CAROUSELS,
  HERO_CAROUSEL_ADD,
  HERO_CAROUSEL_ERROR,
  HERO_CAROUSEL_MODAL_TOGGLE,
  HERO_CAROUSEL_REMOVE,
  HERO_CAROUSEL_UPDATE,
} from "../../Constants/Types";
import axios from "axios";
import { BASE_URL } from "../../Constants/URL";

export const heroCarouselModalToggleAction = (carouselId) => (dispatch) => {
  if (carouselId) {
    dispatch({
      type: HERO_CAROUSEL_MODAL_TOGGLE,
      payload: carouselId,
    });
  } else {
    dispatch({
      type: HERO_CAROUSEL_MODAL_TOGGLE,
    });
  }
};

//FETCH Carousels
export const getCarousels = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/admin/hero`);
    //console.log(res.data);
    dispatch({
      type: GET_HERO_CAROUSELS,
      payload: res.data.reverse(),
    });
  } catch (error) {
    dispatch({
      type: HERO_CAROUSEL_ERROR,
    });
    console.log(error);
  }
};

//Add Carousel
export const addHeroCarousel = (values, selectedFile) => async (dispatch) => {
  let formData = new FormData();

  formData.append("link", values.caption);
  formData.append("heroImage", selectedFile);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/api/admin/hero/`,
      formData,
      config
    );

    dispatch({
      type: HERO_CAROUSEL_ADD,
      payload: res.data,
    });
    //console.log(res.data);
    return true;
  } catch (err) {
    dispatch({
      type: HERO_CAROUSEL_ERROR,
    });
    return false;
  }
};

//DELETE Carousels
export const deleteCarousel = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/admin/hero/${id}`);
    console.log(res.data);
    if (res.data.delete === "success") {
      dispatch({
        type: HERO_CAROUSEL_REMOVE,
        payload: id,
      });
      return true;
    } else {
      dispatch({
        type: HERO_CAROUSEL_ERROR,
      });
    }
  } catch (error) {
    dispatch({
      type: HERO_CAROUSEL_ERROR,
    });
    //console.log(error);
  }
  return false;
};

//EDIT Carousel
export const editHeroCarousel =
  (values, selectedFile, id) => async (dispatch) => {
    let formData = new FormData();

    formData.append("link", values.caption);
    if (selectedFile) {
      formData.append("heroImage", selectedFile);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.patch(
        `${BASE_URL}/api/admin/hero/${id}`,
        formData,
        config
      );
      console.log(res.data);
      dispatch({
        type: HERO_CAROUSEL_UPDATE,
        payload: res.data,
      });
      return true;
    } catch (err) {
      dispatch({
        type: HERO_CAROUSEL_ERROR,
      });
      return false;
    }
  };
