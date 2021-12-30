import axios from "axios";

export const signup = (user) => {
  return axios.post("/api/1.0/users", user);
};

export const login = (user) => {
  return axios.post(
    "/api/1.0/login",
    {},
    { auth: { username: user.userName, password: user.password } }
  );
};

export const setAuthorizationHeader = ({ userName, password, isLoggedIn }) => {
  if (isLoggedIn) {
    axios.defaults.headers.common["Authorization"] = `Basic ${btoa(
      userName + ":" + password
    )}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
