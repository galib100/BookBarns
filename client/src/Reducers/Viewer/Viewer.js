import { LOGIN_SIGNUP_MODAL } from "../../Constants/Types";

const initialState = {
  login_signup_modal: "",
};

const Pages = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SIGNUP_MODAL:
      return {
        ...state,
        login_signup_modal: payload,
      };

    default:
      return state;
  }
};

export default Pages;
