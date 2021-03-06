import {
  all,
  fork,
  call,
  put,
  takeEvery,
  throttle,
  take,
} from "redux-saga/effects";
import axios from "axios";

import {
  UPLOAD_POST_FAILURE,
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POSTS_REQUEST,
  PLUS_POST_COUNT_SUCCESS,
  PLUS_POST_COUNT_FAILURE,
  PLUS_POST_COUNT_REQUEST,
  GET_USER_POSTS_SUCCESSS,
  GET_USER_POSTS_FAILURE,
  GET_USER_POSTS_REQUEST,
  TEST_USER_POSTS_SUCCESSS,
  TEST_USER_POSTS_FAILURE,
  TEST_USER_POSTS_REQUEST,
} from "../reducers/post";

function uploadImageAPI(data) {
  return axios.post("/post/image", data, {
    withCredentials: true,
  });
}
function* uploadImage(action) {
  try {
    const result = yield call(uploadImageAPI, action.data);
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_IMAGE_FAILURE,
    });
  }
}
function* watchUploadImage() {
  yield takeEvery(UPLOAD_IMAGE_REQUEST, uploadImage);
}

function uploadPostAPI(data) {
  return axios.post("/post", data, {
    withCredentials: true,
  });
}
function* uploadPost(action) {
  try {
    const result = yield call(uploadPostAPI, action.data);

    yield put({
      type: UPLOAD_POST_SUCCESS,
      data: result.data,
    });
    action.push("/");
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_POST_FAILURE,
    });
  }
}
function* watchUploadPost() {
  yield takeEvery(UPLOAD_POST_REQUEST, uploadPost);
}

function getPostsAPI(data, lastId = 0, limit = 8) {
  return axios.get(
    data
      ? data.postId
        ? `/post/${data.userId}/${data.postId}`
        : `/post/${data.userId}?count=${data.count}&limit=3`
      : `/post?lastId=${lastId}&limit=${limit}`
  );
}
function* getPosts(action) {
  try {
    const result = yield call(getPostsAPI, action.data, action.lastId);
    yield put({
      type: GET_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GET_POSTS_FAILURE,
    });
  }
}
function* watchGetPosts() {
  yield takeEvery(GET_POSTS_REQUEST, getPosts);
}

function PostCountAPI(postId) {
  return axios.post(`/post/count/${postId}`, {});
}
function* PostCount(action) {
  try {
    const result = yield call(PostCountAPI, action.data);
    yield put({
      type: PLUS_POST_COUNT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: PLUS_POST_COUNT_FAILURE,
    });
  }
}
function* watchPostCount() {
  yield takeEvery(PLUS_POST_COUNT_REQUEST, PostCount);
}

function getUserPostAPI(lastId = 0, limit = 8) {
  return axios.get(`/post?lastId=${lastId}&limit=${limit}`);
}
function* getUserPosts(action) {
  try {
    const result = yield call(getUserPostAPI, action.lastId);
    yield put({
      type: GET_USER_POSTS_SUCCESSS,
      data: result.data,
    });
  } catch (e) {
    console.error(e, "^^^^^^^^^^^");
    yield put({
      type: GET_USER_POSTS_FAILURE,
    });
  }
}
function* watchGetUserPosts() {
  yield throttle(2000, GET_USER_POSTS_REQUEST, getUserPosts);
}

function* testGetUserPosts(action) {
  try {
    yield put({
      type: TEST_USER_POSTS_SUCCESSS,
      data: action.data,
    });
  } catch (e) {
    console.error(e, "^^^^^^^^^^^");
    yield put({
      type: TEST_USER_POSTS_FAILURE,
    });
  }
}
function* watchTestUserPost() {
  yield take(TEST_USER_POSTS_REQUEST, testGetUserPosts);
}
export default function* postSaga() {
  yield all([
    fork(watchUploadPost),
    fork(watchUploadImage),
    fork(watchGetPosts),
    fork(watchPostCount),
    fork(watchGetUserPosts),
    fork(watchTestUserPost),
  ]);
}
