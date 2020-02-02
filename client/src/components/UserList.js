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
      .get("https://node-api3-project-lambda.herokuapp.com/api/users")
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
      <>
        {this.state.users.map(user => (
          <Card className="userCard" bg="success" key={user.id}>
            {user.name}{" "}
          </Card>
        ))}
      </>
    );
  }
}

{
  /* <Card.Title>Card Title</Card.Title> */
}
