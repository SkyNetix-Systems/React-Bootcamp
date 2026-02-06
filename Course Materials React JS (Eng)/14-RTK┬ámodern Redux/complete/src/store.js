import { configureStore } from "@reduxjs/toolkit";
import userListReducer from "./features/usersList/userListSlice";
import userDetailsReducer from "./features/userDetails/userDetailsSlice";

const store = configureStore({
  reducer: {
    userList: userListReducer,
    userDetails: userDetailsReducer,
  },
});

export default store;
