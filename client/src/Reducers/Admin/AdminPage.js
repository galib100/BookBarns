import {
  SIDEBAR_TOGGLE,
  GET_ADMIN,
  ADMIN_REMOVE,
  CREATE_ADMIN,
} from "../../Constants/Types";

const initialState = {
  admins: [],
  sidebar_open: false,
};

const AdminPages = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebar_open: !state.sidebar_open,
      };
    case GET_ADMIN:
      return {
        ...state,
        admins: payload,
      };

    case ADMIN_REMOVE:
      return {
        ...state,
        admins: [...state.admins.filter((item) => item._id !== payload)],
      };
    case CREATE_ADMIN:
      return {
        ...state,
        admins: [payload, ...state.admins],
      };
    default:
      return state;
  }
};

export default AdminPages;
