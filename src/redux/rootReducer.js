import { combineReducers } from "redux";
import babiesReducer from './babies/reducer';

export default combineReducers({
  babies: babiesReducer,
});
