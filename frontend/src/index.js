import "@fontsource/roboto";
import "bootstrap/scss/bootstrap.scss";
import "./App.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
serviceWorker.unregister();
