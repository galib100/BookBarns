import {
  BLOG_EDIT_MODAL,
  BLOG_MODAL_TOGGLE,
  CREATE_BLOG,
  DELETE_BLOG,
  GET_BLOG,
  UPDATE_BLOG,
} from "../../Constants/Types";

const initialState = {
  blogs: [],
  selected_blog: {},
  edit_modal: false,
  blog_modal: false,
  loading: true,
};

const BlogsPage = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case BLOG_EDIT_MODAL:
      let blogselected = [
        ...state.blogs.filter((item) => item._id === payload),
      ];
      return {
        ...state,
        edit_modal: !state.edit_modal,
        selected_blog: { ...blogselected[0] },
        loading: false,
      };
    case BLOG_MODAL_TOGGLE:
      return {
        ...state,
        loading: false,
        blog_modal: !state.blog_modal,
      };
    case GET_BLOG:
      return {
        ...state,
        blogs: payload,
        loading: false,
      };
    case UPDATE_BLOG:
      let list = [
        ...state.blogs.map((item) =>
          item._id === payload._id ? payload : item
        ),
      ];
      return {
        ...state,
        blogs: list,
        loading: false,
      };
    case CREATE_BLOG:
      return {
        ...state,
        blogs: [payload, ...state.blogs],
        selected_blog: payload,
        loading: false,
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((item) => item._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};

export default BlogsPage;
