import { all, takeLatest, call, put } from "redux-saga/effects";

import { getPosts, getPostsStatus } from "./action";

import { getPosts as getPostsQuery } from "./query";

export function* getPostsSaga() {
  try {
    const { data } = yield call(getPostsQuery);
    const posts = data;
    yield put(getPostsStatus(posts));
  } catch (err) {
    yield put(getPostsStatus(err));
  }
}

export default function* postsManagerSaga() {
  yield all([takeLatest(getPosts, getPostsSaga)]);
}
