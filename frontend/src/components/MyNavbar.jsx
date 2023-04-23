import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" style={{ padding: "8px" }}>
      <Navbar.Brand href="/" className="mx-3">
        <strong>Emmerce-9</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
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
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
