import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button, Card } from "react-bootstrap";

import axios from "axios";
export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3100/api/users")
      .then(userList => {
        console.log(userList);
        this.setState({
          users: userList.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Card>
        {this.state.users.map(user => (
          <Card.Title bg="primary" key={user.id}>
            {user.name}{" "}
          </Card.Title>
        ))}
      </Card>
    );
  }
}

{
  /* <Card.Title>Card Title</Card.Title> */
}
