import { handleActions } from "redux-actions";
import {
  getPosts,
  getPostsStatus,
  statusUnset,
  createPostLocaly
} from "./action";

const DEFAULT_STATE = {
  newAction: ["test"],
  status: "",
  items: []
};

const handlers = {
  [getPosts]: state => ({ ...state, status: "PENDING" }),

  [getPostsStatus]: (state, action) => {
    if (action.error) {
      return { ...state, status: "ERROR" };
    }

    const users = { ...action.payload };

    const items = users;
    return { ...state, status: "DONE", items };
  },

  [createPostLocaly]: (state, action) => {
    let finalAction = [];
    if (state.newAction !== undefined) {
      finalAction = [...state.newAction, action.payload];
    } else {
      finalAction = [action.payload];
    }
    return { ...state, newAction: finalAction };
  },

  [statusUnset]: state => {
    return { ...state, status: "" };
  }
};

export default handleActions(handlers, DEFAULT_STATE);
