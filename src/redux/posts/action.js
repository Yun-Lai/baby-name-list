import { createAction } from 'redux-actions';

export const getPosts = createAction('GET_POSTS');
export const getPostsStatus = createAction("GET_POSTS_STATUS");

export const createPostLocaly = createAction("CREATE_POST_LOCALY");
export const statusUnset = createAction("POST_UNSET");