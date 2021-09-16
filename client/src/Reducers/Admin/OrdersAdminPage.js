import { GET_ORDER_ITEM } from "../../Constants/Types";

const initialState = {
  selected_order_admin: {},
  loading: true,
};

const OrdersAdminPage = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDER_ITEM:
      return {
        ...state,
        selected_order_admin: { ...payload },
        loading: false,
      };

    default:
      return state;
  }
};

export default OrdersAdminPage;
