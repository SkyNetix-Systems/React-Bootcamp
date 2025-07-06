import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 🛠️ Redux Toolkit + React-Redux imports
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// 🗃️ Create auth slice (reducers + actions)
const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    loggedInUser: (state, action) => ({ ...state, ...action.payload }),
    logout: (state, action) => action.payload,
  },
});

// 🎯 Export actions for dispatching later
export const { loggedInUser, logout } = authSlice.actions;

// 🏪 Configure store with slices
const store = configureStore({
  reducer: {
    user: authSlice.reducer,
  },
  // DevTools enabled by default 🔥
});

// 🚀 Provide store to entire app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// 📈 Report performance metrics (optional)
reportWebVitals();
