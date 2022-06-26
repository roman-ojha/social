import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import "./styles/variables.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./services/redux-store/store";
import store from "./services/redux/store";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);
