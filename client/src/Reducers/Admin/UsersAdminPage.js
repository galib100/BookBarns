import { GET_USER_PROFILE } from "../../Constants/Types";

const initialState = {
  selected_user_profile: {},
  loading: true,
};

const UsersAdminPage = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        selected_user_profile: { ...payload },
        loading: false,
      };

    default:
      return state;
  }
};

export default UsersAdminPage;
