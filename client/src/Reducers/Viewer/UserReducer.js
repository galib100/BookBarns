import { SET_USER, CLEAR_USER, LOGIN_SIGNUP_MODAL } from "../../Constants/Types";

const initialState = {
  isLogedIn: false,
  login_signup_modal: "",
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER:
        return {
          ...state,
          currentUser: action.currentUser,
          isLogedIn: true,
        };
      case CLEAR_USER:
        return {
          currentUser: null,
          isLogedIn: false,
        };
      case LOGIN_SIGNUP_MODAL:
        return {
          ...state,
          login_signup_modal: action.val,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  