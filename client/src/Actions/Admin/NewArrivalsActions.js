import { NEW_ARRIVALS_MODAL_TOGGLE } from "../../Constants/Types";
import bestSellerData from "../../Components/Admin/data/bestSellerBook";

export const newArrivalsModalToggleAction = (bookId) => (dispatch) => {
  if (bookId) {
    dispatch({
      type: NEW_ARRIVALS_MODAL_TOGGLE,
      payload: bestSellerData.filter((item) => item.id === bookId)[0],
    });
  } else {
    dispatch({
      type: NEW_ARRIVALS_MODAL_TOGGLE,
    });
  }
};
