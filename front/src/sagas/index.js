import { all, fork } from "redux-saga/effects";
import axios from "axios";
import userSaga from "./user";
import postSaga from "./post";
axios.defaults.baseURL = "http://211.193.71.154:8020/api";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
