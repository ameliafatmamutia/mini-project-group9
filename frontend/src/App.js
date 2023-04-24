import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import MyNavbar from "./components/MyNavbar";
import AuthContext from "./components/AuthContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <AuthContext.Provider
      value={{ loggedIn, username, setLoggedIn, setUsername }}
    >
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route Component={Login} path="/login" />
          <Route Component={Register} path="/register" />
          <Route Component={Home} path="/" />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
