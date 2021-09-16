import { LOGIN_SIGNUP_MODAL } from "../../Constants/Types";

export const loginSignupModalToggle = (type) => (dispatch) => {
  dispatch({
    type: LOGIN_SIGNUP_MODAL,
    payload: type,
  });
};
