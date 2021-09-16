import { TRENDING_MODAL_TOGGLE } from "../../Constants/Types";
import bestSellerData from "../../Components/Admin/data/bestSellerBook";

export const trendingModalToggleAction = (bookId) => (dispatch) => {
  if (bookId) {
    dispatch({
      type: TRENDING_MODAL_TOGGLE,
      payload: bestSellerData.filter((item) => item.id === bookId)[0],
    });
  } else {
    dispatch({
      type: TRENDING_MODAL_TOGGLE,
    });
  }
};
