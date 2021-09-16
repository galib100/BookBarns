import { SIDEBAR_TOGGLE } from "../../Constants/Types";

export const sidebarToggleAction = () => (dispatch) => {
  dispatch({
    type: SIDEBAR_TOGGLE,
  });
};
