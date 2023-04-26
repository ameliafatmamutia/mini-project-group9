import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import MyNavbar from "./components/MyNavbar";
import AuthContext from "./components/AuthContext";
import MyStore from "./pages/MyStore";
import RegisterStore from "./pages/RegisterStore";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  // Check if token exists in local storage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token) {
      setLoggedIn(true);
      setUsername(username); // Replace with username obtained from server
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, username, token, setLoggedIn, setUsername, setToken }}
    >
      <BrowserRouter>
        <MyNavbar onLogout={handleLogout} />
        <Routes>
          <Route Component={Login} path="/login" />
          <Route Component={Register} path="/register" />
          <Route Component={Home} path="/" />
          <Route Component={MyStore} path="/my-store" />
          <Route Component={RegisterStore} path="/my-store/register" />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
