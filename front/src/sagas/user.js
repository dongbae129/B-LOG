import { all, fork, call, put, takeEvery } from "redux-saga/effects";
import swal from "sweetalert";

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
  UNACCEPTSUBS_USER_SUCCESSS,
  UNACCEPTSUBS_USER_FAILURE,
  UNACCEPTSUBS_USER_REQUEST,
  CHECK_USER_ID_REQUEST,
  CHECK_USER_ID_SUCCESSS,
  CHECK_USER_ID_FAILURE,
  REFUSE_SUBSCRIBE_USER_SUCCESSS,
  REFUSE_SUBSCRIBE_USER_FAILURE,
  REFUSE_SUBSCRIBE_USER_REQUEST,
} from "../reducers/user";

function signupAPI(data) {
  return axios.post("/user", data);
}
function* signup(action) {
  try {
    yield call(signupAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESSS,
    });
    action.push("/login");
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
    swal("회원 정보가 일치하지 않습니다", "", "warning");

    // alert("아이디 또는 비밀번호가 틀립니다.!!");
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

function getUserInfoAPI(userId) {
  return axios.get(`/user?userId=${userId}`, {
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

function subsCribeAPI(data) {
  return axios.post(
    `/user/subscribe?id=${data.userId}&nick=${data.userNickname}`,
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
    `/user/acceptSubscribe?userId=${userId}`,
    {},
    {
      withCredentials: true,
    }
  );
}
function* acceptSubscribe(action) {
  try {
    const result = yield call(acceptSubscribeAPI, action.data);
    yield put({
      type: ACCEPT_SUBSCRIBE_USER_SUCCESSS,
      data: result.data,
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

function refuseSubscribeAPI(userId) {
  return axios.post(
    `/user/refuseSubscribe?userId=${userId}`,
    {},
    {
      withCredentials: true,
    }
  );
}
function* refuseSubscribe(action) {
  try {
    const result = yield call(refuseSubscribeAPI, action.data);
    yield put({
      type: REFUSE_SUBSCRIBE_USER_SUCCESSS,
      data: result.data,
    });
  } catch (e) {
    console.error(e, "##");
    yield put({
      type: REFUSE_SUBSCRIBE_USER_FAILURE,
    });
  }
}

function* watchRefuseSubscribe() {
  yield takeEvery(REFUSE_SUBSCRIBE_USER_REQUEST, refuseSubscribe);
}

function unAcceptSubscAPI() {
  return axios.get(`/user/unacceptsubs`, {
    withCredentials: true,
  });
}
function* unAcceptSubsc(action) {
  try {
    const result = yield call(unAcceptSubscAPI);
    console.log(result.data, "()()(");
    yield put({
      type: UNACCEPTSUBS_USER_SUCCESSS,
      data: result.data,
    });
  } catch (e) {
    console.error(e, "##");
    yield put({
      type: UNACCEPTSUBS_USER_FAILURE,
    });
  }
}

function* watchUnAcceptSubs() {
  yield takeEvery(UNACCEPTSUBS_USER_REQUEST, unAcceptSubsc);
}

function checkUserIdAPI(userId) {
  console.log(userId, "%%");
  return axios.get(`/user/joincheck?userId=${userId}`);
}
function* checkUserId(action) {
  try {
    console.log(action.data, "~~");
    const result = yield call(checkUserIdAPI, action.data);
    let data;
    console.log(data, "1");
    console.log(result.data, "**");
    result.data === "NNNN" ? (data = true) : (data = false);
    console.log(data, "2");
    yield put({
      type: CHECK_USER_ID_SUCCESSS,
      data,
    });
  } catch (e) {
    yield put({
      type: CHECK_USER_ID_FAILURE,
    });
  }
}

function* watchCheckUserId() {
  yield takeEvery(CHECK_USER_ID_REQUEST, checkUserId);
}

export default function* userSaga() {
  yield all([
    fork(watchSignup),
    fork(watchLogin),
    fork(watchGetUserInfo),
    fork(watchLogout),
    fork(watchSubscribe),
    fork(watchAcceptSubscribe),
    fork(watchRefuseSubscribe),
    fork(watchUnAcceptSubs),
    fork(watchCheckUserId),
  ]);
}
