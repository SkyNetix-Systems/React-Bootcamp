import { configureStore, createSlice } from "@reduxjs/toolkit";

// Load auth state from localStorage (safe fallback)
const authFromStorage = (() => {
    try {
        const stored = localStorage.getItem("auth");
        return stored
            ? JSON.parse(stored)
            : { user: null, token: null };
    } catch {
        return { user: null, token: null };
    }
})();

const authSlice = createSlice({
    name: "auth",
    initialState: authFromStorage,
    reducers: {
        loggedInUser: (state, action) => {
            // Never mutate directly in Redux Toolkit (RTK uses Immer internally, so you *can* write mutations,
            // but replacing the whole state object is fine too)
            return {
                ...state,
                user: action.payload.user || null,
                token: action.payload.token || null,
            };
        },
        logout: () => ({
            user: null,
            token: null,
        }),
    },
});

export const { loggedInUser, logout } = authSlice.actions;

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});
