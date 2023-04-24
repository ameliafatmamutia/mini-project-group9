import React, { useContext } from "react";
import { Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";

const MyNavbar = () => {
  const { loggedIn, username } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" style={{ padding: "8px" }}>
      <Navbar.Brand href="/" className="mx-3">
        <strong>Emmerce-9</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        {loggedIn ? (
          <Nav className="ml-auto">
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                {username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Link to="/login">
              <Button variant="primary" className="mx-2">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline-primary" className="mx-2">
                Register
              </Button>
            </Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
