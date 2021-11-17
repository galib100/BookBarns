import {
  LOAD_ADMIN_DATA,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_ADMIN_USERS,
  LOAD_ADMIN_ORDERS,
  LOGOUT_ADMIN,
  LOGOUT,
  GET_ADMIN,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";
import axios from "axios";
import setAuthToken from "../../Utils/setAuthToken";
import { getCategory } from "./CategoryActions";
import { getCupon } from "./CuponActions";
import { getPublisher } from "./PublisherActions";
import { getAuthor } from "./AuthorActions";

//Load user
export const loadData = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${BASE_URL}/api/admin/dashboard`);
    const adminRes = await axios.get(`${BASE_URL}/api/admin/`);

    dispatch({
      type: LOAD_ADMIN_DATA,
      payload: res.data.books.reverse(),
    });

    dispatch({
      type: LOAD_ADMIN_USERS,
      payload: res.data.users,
    });

    dispatch({
      type: LOAD_ADMIN_ORDERS,
      payload: res.data.orders.reverse(),
    });

    dispatch({
      type: GET_ADMIN,
      payload: adminRes.data,
    });
    dispatch(getCategory());
    dispatch(getAuthor());
    dispatch(getCupon());
    dispatch(getPublisher());
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// TOKEN LOGIN
export const loginToken = (token) => async (dispatch) => {
  //console.log("Token login");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ token });
  try {
    const res = await axios.post(
      `${BASE_URL}/api/verify-admin-token`,
      body,
      config
    );
    //console.log(res);

    if (res.data.verified === true) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token: token, admin: res.data.currentAdmin[0] },
      });
      dispatch(loadData());
      return true;
    } else {
      dispatch({
        type: LOGOUT,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
    });
    return false;
  }
};

//Login User
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.post(`${BASE_URL}/api/admin/login`, body, config);
    //console.log(res.data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: res.data.token, admin: res.data.currentAdmin },
    });
    dispatch(loadData());
    return true;
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
    });
    return false;
  }
};

//Logout / clear profile
export const logout = () => (dispatch) => {
  // dispatch({
  //   type: CLEAR_PROFILE,
  // });
  dispatch({
    type: LOGOUT_ADMIN,
  });
};
