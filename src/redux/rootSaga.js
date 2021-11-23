import { all } from "redux-saga/effects";
import posts from "./posts/saga";

function* rootSaga() {
  yield all([posts()]);
}

export default rootSaga;
