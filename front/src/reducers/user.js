export const initialState = {
  user: null,
  signedup: false,
  subscribe: [],
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

export const SUBSCRIBE_USER_REQUEST = "SUBSCRIBE_USER_REQUEST";
export const SUBSCRIBE_USER_SUCCESSS = "SUBSCRIBE_USER_SUCCESSS";
export const SUBSCRIBE_USER_FAILURE = "SUBSCRIBE_USER_FAILURE";

export const ACCEPT_SUBSCRIBE_USER_REQUEST = "ACCEPT_SUBSCRIBE_USER_REQUEST";
export const ACCEPT_SUBSCRIBE_USER_SUCCESSS = "ACCEPT_SUBSCRIBE_USER_SUCCESSS";
export const ACCEPT_SUBSCRIBE_USER_FAILURE = "ACCEPT_SUBSCRIBE_USER_FAILURE";

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
    case LOG_IN_FAILURE:
    case LOG_IN_REQUEST: {
      return {
        ...state,
      };
    }
    case GET_USER_INFO_SUCCESSS: {
      return {
        ...state,
        user: action.data,
      };
    }
    case LOG_OUT_SUCCESSS: {
      return {
        ...state,
        user: null,
        subscribe: [],
      };
    }
    case LOG_IN_SUCCESSS: {
      return {
        ...state,
        subscribe: action.data,
      };
    }

    default:
      return {
        ...state,
      };
  }
};