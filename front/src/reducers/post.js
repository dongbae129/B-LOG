export const initialState = {
  mainPost: [],
  imagePaths: [],
  // hasMorePost: false,
};

export const UPLOAD_POST_REQUEST = "UPLOAD_POST_REQUEST";
export const UPLOAD_POST_SUCCESS = "UPLOAD_POST_SUCCESS";
export const UPLOAD_POST_FAILURE = "UPLOAD_POST_FAILURE";

export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";

export const GET_POSTS_REQUEST = "GET_POSTS_REQUEST";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

export const GET_USER_POSTS_REQUEST = "GET_USER_POSTS_REQUEST";
export const GET_USER_POSTS_SUCCESSS = "GET_USER_POSTS_SUCCESSS";
export const GET_USER_POSTS_FAILURE = "GET_USER_POSTS_FAILURE";

export const PLUS_POST_COUNT_REQUEST = "PLUS_POST_COUNT_REQUEST";
export const PLUS_POST_COUNT_SUCCESS = "PLUS_POST_COUNT_SUCCESS";
export const PLUS_POST_COUNT_FAILURE = "PLUS_POST_COUNT_FAILURE";

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST: {
      return {
        ...state,
        mainPost: action.lastId === 0 ? [] : state.mainPost,
        hasMorePost: action.lastId ? state.hasMorePost : true,
      };
    }
    case UPLOAD_POST_REQUEST:
    case UPLOAD_POST_FAILURE: {
      return {
        ...state,
      };
    }
    case GET_USER_POSTS_SUCCESSS:
      return {
        ...state,
        mainPost: action.data,
      };
    case GET_POSTS_SUCCESS: {
      console.log(action.data.length, "@@@@");
      return {
        ...state,
        mainPost: state.mainPost.concat(action.data),
        hasMorePost: action.data.length === 10,
      };
    }
    case UPLOAD_IMAGE_SUCCESS: {
      return {
        ...state,
        imagePaths: action.data,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
