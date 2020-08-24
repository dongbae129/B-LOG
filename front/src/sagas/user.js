import { all, fork, call, put, takeEvery } from "redux-saga/effects";

import axios from "axios";
import {
  SIGN_UP_SUCCESSS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  LOG_IN_SUCCESSS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  GET_USER_INFO_SUCCESSS,
  GET_USER_INFO_FAILURE,
  GET_USER_INFO_REQUEST,
  LOG_OUT_SUCCESSS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  SUBSCRIBE_USER_REQUEST,
  SUBSCRIBE_USER_SUCCESSS,
  SUBSCRIBE_USER_FAILURE,
  ACCEPT_SUBSCRIBE_USER_SUCCESSS,
  ACCEPT_SUBSCRIBE_USER_FAILURE,
  ACCEPT_SUBSCRIBE_USER_REQUEST,
} from "../reducers/user";

function signupAPI(data) {
  return axios.post("/user", data);
}
function* signup(action) {
  try {
    console.log(action.data, "@");
    yield call(signupAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESSS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SIGN_UP_FAILURE,
    });
  }
}

function* watchSignup() {
  yield takeEvery(SIGN_UP_REQUEST, signup);
}

function logInAPI(data) {
  return axios.post("/user/login", data, {
    withCredentials: true,
  });
}
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESSS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
    });
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

function getUserInfoAPI(data) {
  return axios.get("/user", {
    withCredentials: true,
  });
}
function* getUserInfo(action) {
  try {
    const result = yield call(getUserInfoAPI, action.data);
    yield put({
      type: GET_USER_INFO_SUCCESSS,
      data: result.data,
      user: !action.data,
    });
  } catch (e) {
    console.error(e, "@@");
    yield put({
      type: GET_USER_INFO_FAILURE,
    });
  }
}

function* watchGetUserInfo() {
  yield takeEvery(GET_USER_INFO_REQUEST, getUserInfo);
}

function logOutAPI() {
  return axios.post(
    "/user/logout",
    {},
    {
      withCredentials: true,
    }
  );
}
function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESSS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
    });
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function subsCribeAPI(userId) {
  return axios.post(
    `/user/subscribe?id=${userId}`,
    {},
    {
      withCredentials: true,
    }
  );
}
function* subsCribe(action) {
  try {
    yield call(subsCribeAPI, action.data);
    yield put({
      type: SUBSCRIBE_USER_SUCCESSS,
    });
  } catch (e) {
    console.error(e, "##");
    yield put({
      type: SUBSCRIBE_USER_FAILURE,
    });
  }
}

function* watchSubscribe() {
  yield takeEvery(SUBSCRIBE_USER_REQUEST, subsCribe);
}

function acceptSubscribeAPI(userId) {
  return axios.post(
    `/user/acceptSubscribe?id=${userId}`,
    {},
    {
      withCredentials: true,
    }
  );
}
function* acceptSubscribe(action) {
  try {
    yield call(acceptSubscribeAPI, action.data);
    yield put({
      type: ACCEPT_SUBSCRIBE_USER_SUCCESSS,
    });
  } catch (e) {
    console.error(e, "##");
    yield put({
      type: ACCEPT_SUBSCRIBE_USER_FAILURE,
    });
  }
}

function* watchAcceptSubscribe() {
  yield takeEvery(ACCEPT_SUBSCRIBE_USER_REQUEST, acceptSubscribe);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogin),
    fork(watchGetUserInfo),
    fork(watchLogout),
    fork(watchSubscribe),
    fork(watchAcceptSubscribe),
  ]);
}
