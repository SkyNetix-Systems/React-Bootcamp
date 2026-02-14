// Import helpers to combine multiple reducers and create Redux store
import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Import individual slice reducers
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

// Import redux-persist utilities to persist Redux state in storage
import {
  persistStore, // creates a persistor for the store (used in main.jsx)
  persistReducer, // wraps reducer to enable persistence
  FLUSH, // action types used internally by redux-persist
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Import storage engine (localStorage for web)
import storage from "redux-persist/lib/storage";

// Configuration for redux-persist
const persistConfig = {
  key: "root", // key under which Redux state will be stored in localStorage
  version: 1, // version for future migrations of persisted state
  storage, // storage engine (localStorage)
};

// Combine multiple slice reducers into a single root reducer
const rootReducer = combineReducers({
  auth: authSlice, // handles authentication state
  job: jobSlice, // handles jobs-related state
  company: companySlice, // handles company-related state
  application: applicationSlice, // handles job application-related state
});

// Wrap root reducer with persistence capabilities
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,

  // Configure middleware and disable serializable check for redux-persist actions
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist internal actions that contain non-serializable values
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export the configured store to be used in Provider
export default store;
