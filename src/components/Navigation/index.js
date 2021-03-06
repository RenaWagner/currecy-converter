import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import NavbarItem from "./NavbarItem";

export default function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        Currency Converter
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <NavbarItem path="/" linkText="Currency Converter" />
          <NavbarItem
            path="/historical-rate"
            linkText="Historical Exchange Rate Checker"
          />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
