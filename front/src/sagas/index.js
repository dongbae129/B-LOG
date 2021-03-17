import { all, fork } from "redux-saga/effects";
import axios from "axios";
import userSaga from "./user";
import postSaga from "./post";
axios.defaults.baseURL = "http://27.96.135.106:8020/api";
axios.defaults.baseURL = "http://localhost:8020/api";

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
