import React from "react";

const AuthContext = React.createContext({
  loggedIn: false,
  username: "",
  setLoggedIn: () => {},
  setUsername: () => {},
});

export default AuthContext;
