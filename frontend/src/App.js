// import logo from "./logo.svg";
import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  // Initialize all the states inside the constructor
  constructor(props) {
    super();
    this.state = {
      list: true,
      card: false,
      users: [],
      user: {},
    };
  }

  // Fetch the list of players from API and store it in the state
  componentDidMount() {
    fetch("http://localhost:5555/users/list")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ users: responseJson.data });
      });
  }
  // a function to handle the view of a single-player card
  showCard = (id) => {
    fetch(`http://localhost:5555/users/${id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ user: responseJson.data });
      });
    this.setState({
      list: false,
      card: true,
    });
  };

  // a function to handle the view of the player’s list
  showList = () => {
    this.setState({
      card: false,
      list: true,
    });
  };

  // Start Render function and return the view
  render() {
    return (
      <div className='container'>
        {this.state.list ? (
          <div className='list-group'>
            {this.state.users.map((user) => (
              <li
                onClick={() => this.showCard(user._id)}
                className='list-group-item list-group-item-action'>
                {user.name}
              </li>
            ))}
          </div>
        ) : null}
        {this.state.card ? (
          <div class='card' style={{ width: "18rem" }}>
            <div class='card-body'>
              <h5 class='card-title'>{this.state.user.name}</h5>
              <p class='card-text'>{this.state.user.runs}</p>
              <div onClick={() => this.showList()} class='btn btn-primary'>
                Back
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  //...
}
