import { all, fork, call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  UPLOAD_POST_FAILURE,
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_REQUEST,
} from "../reducers/post";

function uploadImageAPI(data) {
  return axios.post("/post/image", data, {
    withCredentials: true,
  });
}
function* uploadImage(action) {
  try {
    console.log(action.data, "%%%");
    const result = yield call(uploadImageAPI, action.data);
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e, "##");
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
  } catch (e) {
    console.error(e, "##");
    yield put({
      type: UPLOAD_POST_FAILURE,
    });
  }
}
function* watchUploadPost() {
  yield takeEvery(UPLOAD_POST_REQUEST, uploadPost);
}

export default function* postSaga() {
  yield all([fork(watchUploadPost), fork(watchUploadImage)]);
}
