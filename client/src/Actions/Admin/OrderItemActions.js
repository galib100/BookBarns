import { GET_ORDER_ITEM } from "../../Constants/Types";
import data from "../../Components/Admin/data/orders";

export const getOrderItem = (orderId) => (dispatch) => {
  let selectedOrder = data.filter((item) => item.id === orderId)[0];
  //console.log(selectedOrder);
  if (selectedOrder) {
    dispatch({
      type: GET_ORDER_ITEM,
      payload: selectedOrder,
    });
    return true;
  } else {
    return false;
  }
};
