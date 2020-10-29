export const initialState = {
  user: null,
  signedup: false,
  subscribe: [],
  unacceptSubs: [],
  login: true,
  loginSuccess: false,
  checkUserId: null,
  checkSubscribe: false,
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

export const REFUSE_SUBSCRIBE_USER_REQUEST = "REFUSE_SUBSCRIBE_USER_REQUEST";
export const REFUSE_SUBSCRIBE_USER_SUCCESSS = "REFUSE_SUBSCRIBE_USER_SUCCESSS";
export const REFUSE_SUBSCRIBE_USER_FAILURE = "REFUSE_SUBSCRIBE_USER_FAILURE";

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
    case SIGN_UP_SUCCESSS: {
      return {
        ...state,
        checkUserId: null,
      };
    }
    case GET_USER_INFO_SUCCESSS: {
      return {
        ...state,
        user: action.data,
        login: true,
        checkUserId: null,
        checkSubscribe: false,
      };
    }
    case GET_USER_INFO_FAILURE: {
      return {
        ...state,
        checkUserId: null,
        login: false,
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
        checkUserId: null,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        loginSuccess: true,
      };
    }
    case SUBSCRIBE_USER_SUCCESSS: {
      return {
        ...state,
        checkSubscribe: true,
      };
    }
    case ACCEPT_SUBSCRIBE_USER_SUCCESSS:
    case REFUSE_SUBSCRIBE_USER_SUCCESSS:
    case UNACCEPTSUBS_USER_SUCCESSS: {
      return {
        ...state,
        unacceptSubs: action.data,
      };
    }
    case CHECK_USER_ID_REQUEST: {
      return {
        ...state,
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
