import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import { Navbar, Nav, Form, FormControl, Button, Card } from "react-bootstrap";

// components
import UserList from "./UserList";
export default class NavBar extends Component {
  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Link to="/">
            <Navbar.Brand href="#home">Home</Navbar.Brand>
          </Link>
          <Nav className="mr-auto">
            <Nav.Link href="/features">Features</Nav.Link>
            <Nav.Link href="/">Pricing</Nav.Link>
          </Nav>
        </Navbar>

        <Route exact path="/" component={UserList} />
      </>
    );
  }
}