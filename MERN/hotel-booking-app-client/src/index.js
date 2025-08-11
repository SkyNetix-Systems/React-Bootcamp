// 📦 Core imports
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 🛠️ Redux imports
import { Provider } from "react-redux";
import { store } from "./store";

// 🚀 Modern React 18 root rendering
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// 📊 Optional performance tracking
reportWebVitals();
