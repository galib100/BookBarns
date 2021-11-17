import { ON_SALE_MODAL_TOGGLE } from "../../Constants/Types";

export const onSaleModalToggleAction = (bookId) => (dispatch) => {
  if (bookId) {
    console.log(bookId);
    dispatch({
      type: ON_SALE_MODAL_TOGGLE,
      payload: bookId,
    });
  } else {
    dispatch({
      type: ON_SALE_MODAL_TOGGLE,
    });
  }
};
