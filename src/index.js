import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { UserSignupPage } from "./pages/UserSignupPage";
import App from "./containers/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import authReducer from "./redux/authReducer";

const loggedInState = {
  id: 1,
  username: "user1",
  displayName: "display1",
  image: "profile1.png",
  password: "P4ssword",
  isLoggedIn: true,
};

const store = createStore(authReducer, loggedInState);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,

  document.getElementById("root")
);
