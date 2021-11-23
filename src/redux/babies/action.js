import { createAction } from 'redux-actions';

export const addBaby = createAction("ADD_BABY");

export const clearBabies = createAction('CLEAR_BABIES');

export const setBabies = createAction('SET_BABIES');

export const setSort = createAction('SET_SORT');