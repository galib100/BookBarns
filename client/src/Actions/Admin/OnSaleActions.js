import { ON_SALE_MODAL_TOGGLE } from "../../Constants/Types";
import bestSellerData from "../../Components/Admin/data/bestSellerBook";

export const onSaleModalToggleAction = (bookId) => (dispatch) => {
  if (bookId) {
    dispatch({
      type: ON_SALE_MODAL_TOGGLE,
      payload: bestSellerData.filter((item) => item.id === bookId)[0],
    });
  } else {
    dispatch({
      type: ON_SALE_MODAL_TOGGLE,
    });
  }
};
