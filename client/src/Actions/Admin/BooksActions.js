import {
  BOOK_ERROR,
  CREATE_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  GET_BOOK,
} from "../../Constants/Types";
import { BASE_URL } from "../../Constants/URL";
import axios from "axios";

export const getBook = (bookId) => (dispatch) => {
  dispatch({
    type: GET_BOOK,
    payload: bookId,
  });
  return true;
};

//DELETE BOOK
export const deleteBook = (bookId) => async (dispatch) => {
  const res = await axios.patch(`${BASE_URL}/api/admin/book/delete/${bookId}`);
  //console.log(res);
  if (res.data) {
    dispatch({
      type: DELETE_BOOK,
      payload: bookId,
    });
    return true;
  } else {
    dispatch({
      type: BOOK_ERROR,
    });
    return false;
  }
};

//Edit book
export const editBook = (values, selectedFile, id) => async (dispatch) => {
  let formData = new FormData();
  formData.append("title", values.title);
  formData.append("author", values.author);
  formData.append("quantity", values.quantity);
  formData.append("available", values.quantity);
  formData.append("category", values.category);
  formData.append("subcategory", values.subcategory);
  formData.append("tags", values.tags);
  formData.append("genre", values.genre);
  formData.append("price", values.price);
  formData.append("discount", values.discount);
  formData.append("discounttype", values.type);
  formData.append("sku", values.sku);
  formData.append("pages", values.page);
  formData.append("publisher", values.publisher);
  formData.append("edition", values.edition);
  formData.append("year", values.year);
  formData.append("description", values.description);
  formData.append("isbn", values.isbn);
  formData.append("quality", values.quality);
  if (selectedFile) {
    formData.append("bookImage", selectedFile);
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
      `${BASE_URL}/api/admin/book/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_BOOK,
      payload: res.data[0],
    });
    console.log(res.data);
    return true;
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
    });
    console.log(err);
    return false;
  }
};

//Add book
export const addBook = (values, selectedFile) => async (dispatch) => {
  let formData = new FormData();

  formData.append("title", values.title);
  formData.append("author", values.author);
  formData.append("quantity", values.quantity);
  formData.append("available", values.quantity);
  formData.append("category", values.category);
  formData.append("subcategory", values.subcategory);
  formData.append("genre", values.genre);
  formData.append("price", values.price);
  formData.append("discount", values.discount);
  formData.append("discounttype", values.type);
  formData.append("pages", values.page);
  formData.append("publisher", values.publisher);
  formData.append("edition", values.edition);
  formData.append("year", values.year);
  formData.append("description", values.description);
  formData.append("isbn", values.isbn);
  //SKU CAN BE NEEDED TO CHANGE AFTER API IS MADE
  formData.append("sku", values.sku);
  formData.append("quality", values.quality);
  formData.append("tags", values.tags);
  formData.append("bookImage", selectedFile);
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/api/admin/book/add/`,
      formData,
      config
    );
    console.log(res.data);

    dispatch({
      type: CREATE_BOOK,
      payload: res.data,
    });
    //console.log(res.data);
    return true;
  } catch (err) {
    dispatch({
      type: BOOK_ERROR,
    });
    return false;
  }
};
