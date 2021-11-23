import { createStore, applyMiddleware, compose } from "redux";
import { persistReducer } from "redux-persist";
import LocalStorage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage: LocalStorage
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const enhancers = [];

if (middleware.length > 0) {
  enhancers.push(applyMiddleware(...middleware));
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeEnhancers(...enhancers));

sagaMiddleware.run(rootSaga, store.dispatch);

export default store;
