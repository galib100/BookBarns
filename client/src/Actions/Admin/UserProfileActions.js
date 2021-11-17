import axios from "axios";
import {
  ADMIN_USER_DELETED,
  ADMIN_USER_DELETED_ERROR,
  GET_USER_PROFILE,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";

export const getUserProfile = (userId) => (dispatch) => {
  // console.log(userId);
  let id = userId.toString();
  dispatch({
    type: GET_USER_PROFILE,
    payload: id,
  });
  return true;
};
export const deleteUserProfile = (userId) => (dispatch) => {
  // console.log(userId);
  try {
    const res = axios.delete(`${BASE_URL}/api/admin/users/${userId}`);

    dispatch({
      type: ADMIN_USER_DELETED,
      payload: userId,
    });
    return true;
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN_USER_DELETED_ERROR,
    });
    return false;
  }
};
