import { handleActions } from "redux-actions";
import {
    addBaby,
    clearBabies,
    setBabies,
    setSort,
} from "./action";

const DEFAULT_STATE = {
  status: "",
  babies: [],
  sort: 'custom',
};

const handlers = {
  [addBaby]: (state, action) => {
    const babies = [...state.babies, action.payload];
    return { ...state, babies, status: 'add' };
  },
  [setBabies]: (state, action) => {
    const babies = action.payload;
    return { ...state, babies, status: 'set'}
  },
  [setSort]: (state, action) => {
    return { ...state, sort: action.payload};
  },
  [clearBabies]: () => (DEFAULT_STATE)
};

export default handleActions(handlers, DEFAULT_STATE);
