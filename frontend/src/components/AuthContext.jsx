import React from "react";

const AuthContext = React.createContext({
  loggedIn: false,
  username: "",
  token: "",
  setLoggedIn: () => {},
  setUsername: () => {},
  setToken: () => {},
});

export default AuthContext;
