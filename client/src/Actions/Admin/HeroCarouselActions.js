import { HERO_CAROUSEL_MODAL_TOGGLE } from "../../Constants/Types";
import carouselData from "../../Components/Admin/data/carousel";

export const heroCarouselModalToggleAction = (carouselId) => (dispatch) => {
  if (carouselId) {
    dispatch({
      type: HERO_CAROUSEL_MODAL_TOGGLE,
      payload: carouselData.filter((item) => item.id === carouselId)[0],
    });
  } else {
    dispatch({
      type: HERO_CAROUSEL_MODAL_TOGGLE,
    });
  }
};
