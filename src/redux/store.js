import { combineReducers, createStore, applyMiddleware } from "redux";
import reducerAddBooks from "./reducers/reducerAddBooks";
import thunk from "redux-thunk";
import reducerFetchBooks from "./reducers/reducerFetchBooks";

const rootReducer = combineReducers({
  library: reducerAddBooks,
  search: reducerFetchBooks,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
