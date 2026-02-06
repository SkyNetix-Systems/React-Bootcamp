import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUserId: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    selctedUser(state, action) {
      state.selectedUserId = action.payload;
    },
    clearSelectedUser(state) {
      state.selectedUserId = null;
    },
  },
});

export const { selctedUser, clearSelectedUser } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
