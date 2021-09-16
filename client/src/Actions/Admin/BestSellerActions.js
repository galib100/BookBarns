import { BEST_SELLER_MODAL_TOGGLE } from "../../Constants/Types";
import bestSellerData from "../../Components/Admin/data/bestSellerBook";

export const bestSellerModalToggleAction = (bookId) => (dispatch) => {
  if (bookId) {
    dispatch({
      type: BEST_SELLER_MODAL_TOGGLE,
      payload: bestSellerData.filter((item) => item.id === bookId)[0],
    });
  } else {
    dispatch({
      type: BEST_SELLER_MODAL_TOGGLE,
    });
  }
};
