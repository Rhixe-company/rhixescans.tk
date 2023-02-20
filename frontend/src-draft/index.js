import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.js";

// import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

// import "./css/main.css";
// import "./App.css";

// import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
