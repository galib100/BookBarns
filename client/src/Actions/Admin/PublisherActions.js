import axios from "axios";
import {
  GET_PUBLISHER,
  PUBLISHER_ERROR,
  ADD_PUBLISHER_MODAL_TOGGLE,
  EDIT_PUBLISHER_MODAL_TOGGLE,
  PUBLISHER_REMOVE,
  PUBLISHER_ADD,
  PUBLISHER_UPDATE,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";

//ADD Publisher modal
export const addPublisherModalToggleAction = () => (dispatch) => {
  dispatch({
    type: ADD_PUBLISHER_MODAL_TOGGLE,
  });
};

//EDIT Publisher modal
export const editPublisherModalToggleAction = (id) => (dispatch) => {
  dispatch({
    type: EDIT_PUBLISHER_MODAL_TOGGLE,
    payload: id,
  });
};

//FETCH Publishers
export const getPublisher = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/admin/allPublishers`);
    function compare(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
    res.data.sort(compare);
    dispatch({
      type: GET_PUBLISHER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PUBLISHER_ERROR,
    });
  }
};

//DELETE Publisher
export const deletePublisher = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/api/admin/deleteSpecificPublisher/${id}`
    );
    //console.log(res);
    if (res.data.delete) {
      dispatch({
        type: PUBLISHER_REMOVE,
        payload: id,
      });
      return true;
    } else {
      dispatch({
        type: PUBLISHER_ERROR,
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: PUBLISHER_ERROR,
    });
    console.log(error);
    return false;
  }
};

//Add Pub
export const addPublisher = (values, selectedFile) => async (dispatch) => {
  let formData = new FormData();
  formData.append("name", values.name);
  formData.append("publisherImage", selectedFile);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const res = await axios.post(
      `${BASE_URL}/api/admin/addNewPublisher`,
      formData,
      config
    );
    if (res.data) {
      dispatch({
        type: PUBLISHER_ADD,
        payload: res.data,
      });
      return true;
    }
  } catch (err) {
    dispatch({
      type: PUBLISHER_ERROR,
    });
    return false;
  }
};

//EDIT Publisher
export const editPublisher = (values, selectedFile, id) => async (dispatch) => {
  let formData = new FormData();
  formData.append("name", values.name);
  if (selectedFile) {
    formData.append("publisherImage", selectedFile);
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const res = await axios.patch(
      `${BASE_URL}/api/admin/editSpecificPublisher/${id}`,
      formData,
      config
    );

    dispatch({
      type: PUBLISHER_UPDATE,
      payload: res.data,
    });
    //console.log(res.data);
    return true;
  } catch (err) {
    dispatch({
      type: PUBLISHER_ERROR,
    });
    return false;
  }
};
