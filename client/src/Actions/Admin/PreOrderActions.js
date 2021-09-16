import { PRE_ORDER_MODAL_TOGGLE } from "../../Constants/Types";
import bestSellerData from "../../Components/Admin/data/bestSellerBook";

export const preOrderModalToggleAction = (bookId) => (dispatch) => {
  if (bookId) {
    dispatch({
      type: PRE_ORDER_MODAL_TOGGLE,
      payload: bestSellerData.filter((item) => item.id === bookId)[0],
    });
  } else {
    dispatch({
      type: PRE_ORDER_MODAL_TOGGLE,
    });
  }
};
