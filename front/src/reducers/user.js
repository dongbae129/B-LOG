export const initialState = {
  user: null,
  signedup: false,
};

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESSS = "SIGN_UP_SUCCESSS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESSS = "LOG_IN_SUCCESSS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESSS = "LOG_OUT_SUCCESSS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESSS = "GET_USER_INFO_SUCCESSS";
export const GET_USER_INFO_FAILURE = "GET_USER_INFO_FAILURE";

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
    case LOG_IN_FAILURE:
    case LOG_IN_REQUEST: {
      return {
        ...state,
      };
    }
    case GET_USER_INFO_SUCCESSS:
    case LOG_IN_SUCCESSS: {
      return {
        ...state,
        user: action.data,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
