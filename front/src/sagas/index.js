import { all, fork } from "redux-saga/effects";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080/api";

export default function* rootSaga() {
  yield all([]);
}
