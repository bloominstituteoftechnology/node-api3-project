import React, { Component } from "react";
import { Route } from "react-router-dom";

import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

// components
import UserList from "./UserList";
export default class NavBar extends Component {
  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>

        <Route exact path="/" component={UserList} />
      </>
    );
  }
}
