import { GET_USER_PROFILE } from "../../Constants/Types";
import data from "../../Components/Admin/data/users";

export const getUserProfile = (userId) => (dispatch) => {
  let selectedUser = data.filter((item) => item.id === userId)[0];
  console.log(selectedUser);
  if (selectedUser) {
    dispatch({
      type: GET_USER_PROFILE,
      payload: selectedUser,
    });
    return true;
  } else {
    return false;
  }
};
