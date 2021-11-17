import {
  ADMIN_USER_DELETED,
  GET_USER_PROFILE,
  LOAD_ADMIN_USERS,
} from "../../Constants/Types";

const initialState = {
  users: [],
  selected_user_profile: {},
  loading: true,
};

const UsersAdminPage = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        selected_user_profile: state.users.filter(
          (item) => item.id === payload
        )[0],
        loading: false,
      };
    case LOAD_ADMIN_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case ADMIN_USER_DELETED:
      return {
        ...state,
        users: [...state.users.filter((item) => item.id !== payload)],
        loading: false,
      };

    default:
      return state;
  }
};

export default UsersAdminPage;
