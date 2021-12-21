import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { UserSignupPage } from "./pages/UserSignupPage";
import App from "./containers/App";
import { LoginPage } from "./pages/LoginPage";

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
