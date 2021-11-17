import {
  GET_ORDER_ITEM,
  ORDER_ERROR,
  UPDATE_ORDER_STATUS,
} from "../../Constants/Types";
import axios from "axios";
import { BASE_URL } from "../../Constants/URL";

export const getOrderItem = (orderId) => (dispatch) => {
  //console.log(orderId)
  dispatch({
    type: GET_ORDER_ITEM,
    payload: orderId,
  });
};

//EDIT STATUS
export const editOrderStatus = (status, orderId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ status: status });
  try {
    const res = await axios.patch(
      `${BASE_URL}/api/order/${orderId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_ORDER_STATUS,
      payload: res.data[0],
    });
    console.log(res.data[0]);
    return true;
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
    });
    //console.log(err);
    return false;
  }
};
