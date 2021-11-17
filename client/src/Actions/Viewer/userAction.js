import { SET_USER, CLEAR_USER, LOGIN_SIGNUP_MODAL } from "../../Constants/Types";

// SETUP USER PRIMARY INFO
export const setUser = (currentUser) => {
    return {
      type: SET_USER,
      currentUser
    };
  };
  
// CLEAR USER INFO FROM REDUX
export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

// CONTROLLING AUTH MODAL
export const loginSignupModalToggle = (val) => {
  return{
    type: LOGIN_SIGNUP_MODAL,
    val: val,
  };
};

