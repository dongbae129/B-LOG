export const initialState = {
  mainPost: null,
  imagePaths: [],
};

export const UPLOAD_POST_REQUEST = "UPLOAD_POST_REQUEST";
export const UPLOAD_POST_SUCCESS = "UPLOAD_POST_SUCCESS";
export const UPLOAD_POST_FAILURE = "UPLOAD_POST_FAILURE";

export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";

export default (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_POST_REQUEST:
    case UPLOAD_POST_FAILURE: {
      return {
        ...state,
      };
    }
    case UPLOAD_POST_SUCCESS: {
      return {
        ...state,
        mainPost: action.data,
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
