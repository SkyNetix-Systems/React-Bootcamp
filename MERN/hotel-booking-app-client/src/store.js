import { configureStore, createSlice } from "@reduxjs/toolkit";

const authFromStorage = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

const authSlice = createSlice({
    name: "auth",
    initialState: authFromStorage, // preload state from localStorage
    reducers: {
        loggedInUser: (state, action) => action.payload,
        logout: () => null
    }
});

export const { loggedInUser, logout } = authSlice.actions;

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    }
});
