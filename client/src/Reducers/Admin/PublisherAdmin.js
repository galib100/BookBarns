import {
  ADD_PUBLISHER_MODAL_TOGGLE,
  EDIT_PUBLISHER_MODAL_TOGGLE,
  GET_PUBLISHER,
  PUBLISHER_ADD,
  PUBLISHER_REMOVE,
  PUBLISHER_UPDATE,
} from "../../Constants/Types";

const initialState = {
  publishers: [],
  selected_publisher: {},
  publisher_add_modal: false,
  publisher_edit_modal: false,
  loading: true,
};

const PublisherAdmin = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PUBLISHER_MODAL_TOGGLE:
      return {
        ...state,
        publisher_add_modal: !state.publisher_add_modal,
        loading: false,
      };
    case EDIT_PUBLISHER_MODAL_TOGGLE:
      return {
        ...state,
        publisher_edit_modal: !state.publisher_edit_modal,
        selected_publisher: {
          ...state.publishers.filter((item) => item._id === payload)[0],
        },
        loading: false,
      };
    case GET_PUBLISHER:
      return {
        ...state,
        publishers: payload,
        loading: false,
      };
    case PUBLISHER_UPDATE:
      let list = [
        ...state.publishers.map((item) =>
          item._id === payload._id ? payload : item
        ),
      ];
      return {
        ...state,
        publishers: list,
        loading: false,
      };
    case PUBLISHER_ADD:
      return {
        ...state,
        publishers: [...state.publishers, { ...payload }],
        loading: false,
      };
    case PUBLISHER_REMOVE:
      return {
        ...state,
        publishers: state.publishers.filter((item) => item._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};

export default PublisherAdmin;
