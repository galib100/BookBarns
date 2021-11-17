import {
  LOGIN_SUCCESS,
  USER_LOADED,
  LOGIN_FAIL,
  LOGOUT_ADMIN,
} from "../../Constants/Types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: {},
  admin: {},
  loading: true,
};

const Auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        admin: payload.admin,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_FAIL:
    case LOGOUT_ADMIN:
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default Auth;
