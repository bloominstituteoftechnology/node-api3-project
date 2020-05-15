import React from 'react';
import axios from 'axios'
import './App.css'
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: []
    };
  }
  componentDidMount() {

    axios
      .get('https://firstlambdaschool.herokuapp.com/users/')
      .then(response => {
        this.setState({
          name: response.data.map(item => {
            return item
          })
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  render() {
    return (
      <div className='toDoList'>
        <div data-testid='players'>
          {this.state.name.map(item => {
            return <div className='item' key={item.id}>{item.name}</div>
          })}
        </div>
      </div>
    );
  }
}
export default App;
