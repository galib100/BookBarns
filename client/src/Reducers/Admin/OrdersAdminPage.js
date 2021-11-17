import {
  GET_ORDER_ITEM,
  LOAD_ADMIN_ORDERS,
  UPDATE_ORDER_STATUS,
} from "../../Constants/Types";

const initialState = {
  selected_order_admin: {},
  orders: [],
  loading: true,
};

const OrdersAdminPage = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDER_ITEM:
      return {
        ...state,
        selected_order_admin: state.orders.filter(
          (item) => item.id === payload
        )[0],
        loading: false,
      };
    case LOAD_ADMIN_ORDERS:
      return {
        ...state,
        orders: payload,
        loading: false,
      };

    case UPDATE_ORDER_STATUS:
      let selected = {};
      let list = [
        ...state.orders.map((item) => {
          if (item.id === payload._id) {
            return { ...item, status: payload.status };
          } else {
            return { ...item };
          }
        }),
      ];
      if (state.selected_order_admin !== {}) {
        selected = {
          ...state.orders.filter((item) => item.id === payload._id)[0],
          status: payload.status,
        };
      }
      return {
        ...state,
        orders: list,
        selected_order_admin: selected,
        loading: false,
      };

    default:
      return state;
  }
};

export default OrdersAdminPage;
