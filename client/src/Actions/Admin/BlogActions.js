import { BLOG_MODAL_TOGGLE } from "../../Constants/Types";

export const blogModalToggleAction = () => (dispatch) => {
  dispatch({
    type: BLOG_MODAL_TOGGLE,
  });
};
