import {
  POST_FORM,
  POST_UPDATE_FORM,
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  POST_ERROR,
  VALIDATE_POST,
  CURRENT_POST,
  DELETE_POST,
  GET_CREATOR,
  SPINNER_ON,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case POST_FORM:
      return {
        ...state,
        form: !state.form
      };
      case POST_UPDATE_FORM:
        return {
            ...state,
            formupdate: !state.formupdate
        }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        postsfiltered: action.payload,
        spinnerpost: null,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        postsfiltered: [...state.postsfiltered, action.payload],
        form: false,
        errorform: false,
      };
      case UPDATE_POST:
        return {
            ...state,
            posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post ),
            postsfiltered: state.postsfiltered.map(post => post._id === action.payload._id ? action.payload : post ),
            formupdate: !state.formupdate
        }
    case VALIDATE_POST:
      return {
        ...state,
        errorform: true,
      };
    case CURRENT_POST:
      return {
        ...state,
        postsfiltered: state.posts.filter((post) => post.type.includes(action.payload)),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        postsfiltered: state.posts.filter((post) => post._id !== action.payload),
        post: null,
      };
    case POST_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case GET_CREATOR:
      return {
        ...state,
        creatorInfo: action.payload,
      };
    case SPINNER_ON:
      return {
        ...state,
        spinnerpost: true
      };
    default:
      return state;
  }
};
