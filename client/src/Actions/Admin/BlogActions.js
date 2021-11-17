import axios from "axios";
import {
  BLOG_EDIT_MODAL,
  BLOG_ERROR,
  BLOG_MODAL_TOGGLE,
  CREATE_BLOG,
  DELETE_BLOG,
  GET_BLOG,
  UPDATE_BLOG,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";

//ADD BLOG MODAL
export const blogModalToggleAction = () => (dispatch) => {
  dispatch({
    type: BLOG_MODAL_TOGGLE,
  });
};

//EDIT BLOG MODAL
export const blogEditModalToggleAction = (id) => (dispatch) => {
  dispatch({
    type: BLOG_EDIT_MODAL,
    payload: id,
  });
};

//FETCH BLOGS
export const getBlogs = () => async (dispatch) => {
  const res = await axios.get(`${BASE_URL}/api/admin/blog`);
  //console.log(res.data);
  dispatch({
    type: GET_BLOG,
    payload: res.data.reverse(),
  });
};

//Add BLOG
export const addBlog = (values, selectedFile) => async (dispatch) => {
  let formData = new FormData();
  formData.append("title", values.title);
  formData.append("short_description", values.description);
  console.log(values.description);
  formData.append("blogImage", selectedFile);
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
      `${BASE_URL}/api/admin/blog/add`,
      formData,
      config
    );

    dispatch({
      type: CREATE_BLOG,
      payload: res.data,
    });
    console.log(res.data);
    return true;
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
    });
    return false;
  }
};

//DELETE BOOK
export const deleteBlog = (blogId) => async (dispatch) => {
  const res = await axios.delete(`${BASE_URL}/api/admin/blog/${blogId}`);
  //console.log(res);
  if (res.data.deletedCount > 0) {
    dispatch({
      type: DELETE_BLOG,
      payload: blogId,
    });
    return true;
  } else {
    dispatch({
      type: BLOG_ERROR,
    });
    return false;
  }
};

//EDIT BLOG
export const editBlog = (values, selectedFile, blogId) => async (dispatch) => {
  let formData = new FormData();
  formData.append("title", values.title);
  formData.append("short_description", values.description);
  if (selectedFile) {
    formData.append("blogImage", selectedFile);
  }

  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const res = await axios.patch(
      `${BASE_URL}/api/admin/blog/${blogId}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_BLOG,
      payload: res.data[0],
    });
    //console.log(res.data);
    return true;
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
    });
    return false;
  }
};
