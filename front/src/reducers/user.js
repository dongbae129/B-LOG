export const initialState = {
  user: null,
  signedup: false,
  subscribe: [],
  unacceptSubs: [],
  login: false,
  loginSuccess: false,
  checkUserId: null,
  Test: null,
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

export const UNACCEPTSUBS_USER_REQUEST = "UNACCEPTSUBS_USER_REQUEST";
export const UNACCEPTSUBS_USER_SUCCESSS = "UNACCEPTSUBS_USER_SUCCESSS";
export const UNACCEPTSUBS_USER_FAILURE = "UNACCEPTSUBS_USER_FAILURE";

export const ACCEPT_SUBSCRIBE_USER_REQUEST = "ACCEPT_SUBSCRIBE_USER_REQUEST";
export const ACCEPT_SUBSCRIBE_USER_SUCCESSS = "ACCEPT_SUBSCRIBE_USER_SUCCESSS";
export const ACCEPT_SUBSCRIBE_USER_FAILURE = "ACCEPT_SUBSCRIBE_USER_FAILURE";

export const CHECK_USER_ID_REQUEST = "CHECK_USER_ID_REQUEST";
export const CHECK_USER_ID_SUCCESSS = "CHECK_USER_ID_SUCCESSS";
export const CHECK_USER_ID_FAILURE = "CHECK_USER_ID_FAILURE";

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO_REQUEST:
    case LOG_IN_REQUEST: {
      return {
        ...state,
      };
    }
    case GET_USER_INFO_SUCCESSS: {
      return {
        ...state,
        user: action.data,
        login: true,
      };
    }
    case LOG_OUT_SUCCESSS: {
      return {
        ...state,
        user: null,
        subscribe: [],
        login: false,
      };
    }
    case LOG_IN_SUCCESSS: {
      return {
        ...state,
        user: action.data,
        login: true,
        loginSuccess: false,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        loginSuccess: true,
      };
    }
    case ACCEPT_SUBSCRIBE_USER_SUCCESSS:
    case UNACCEPTSUBS_USER_SUCCESSS: {
      return {
        ...state,
        unacceptSubs: action.data,
      };
    }
    case CHECK_USER_ID_REQUEST: {
      return {
        ...state,
        Test: "무ㅗ지",
      };
    }
    case CHECK_USER_ID_SUCCESSS: {
      return {
        ...state,
        checkUserId: action.data,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
