import { ADMIN_ERROR, ADMIN_REMOVE, CREATE_ADMIN } from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";
import axios from "axios";

//Add Admin
export const addAdmin = (values, selectedFile) => async (dispatch) => {
  let formData = new FormData();

  formData.append("username", values.username);
  formData.append("role", values.role);
  formData.append("password", values.password);
  formData.append("adminImage", selectedFile);

  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/api/admin/signup`,
      formData,
      config
    );

    dispatch({
      type: CREATE_ADMIN,
      payload: res.data,
    });
    console.log(res.data);
    return true;
  } catch (err) {
    dispatch({
      type: ADMIN_ERROR,
    });
    return false;
  }
};

//REMOVE ADMIN
export const removeAdmin = (id) => async (dispatch) => {
  if (id) {
    try {
      const res = await axios.delete(`${BASE_URL}/api/admin/${id}`);

      dispatch({
        type: ADMIN_REMOVE,
        payload: id,
      });
      return true;
    } catch (err) {
      dispatch({
        type: ADMIN_ERROR,
      });
      return false;
    }
  }
};
