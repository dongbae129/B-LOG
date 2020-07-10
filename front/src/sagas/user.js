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
    console.error(e, "##");
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
    console.error(e, "##");
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
function* getUserInfo() {
  try {
    const result = yield call(getUserInfoAPI);
    yield put({
      type: GET_USER_INFO_SUCCESSS,
      data: result.data,
    });
  } catch (e) {
    console.error(e, "##");
    yield put({
      type: GET_USER_INFO_FAILURE,
    });
  }
}

function* watchGetUserInfo() {
  yield takeEvery(GET_USER_INFO_REQUEST, getUserInfo);
}

export default function* userSaga() {
  yield all([fork(watchSignup), fork(watchLogin), fork(watchGetUserInfo)]);
}
