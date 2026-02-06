import { createStore } from "redux";
import userListReducer from "./features/usersList/userListSlice";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

console.log(store.getState());
