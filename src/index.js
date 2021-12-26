import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./containers/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import authReducer from "./redux/authReducer";
import logger from "redux-logger";

const store = createStore(authReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,

  document.getElementById("root")
);
