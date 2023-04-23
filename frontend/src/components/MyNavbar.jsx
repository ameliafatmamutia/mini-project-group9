import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" style={{ padding: "8px" }}>
      <Navbar.Brand href="/" className="mx-3">
        <strong>Emmerce-9</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
          <Button variant="primary" className="mx-2">
            Login
          </Button>
          <Button variant="outline-primary" className="mx-2">
            Register
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
