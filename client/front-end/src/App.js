import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


 
function App() {



  const [users, setUsers]= useState([]);

useEffect(()=> {

  axios.get('http://localhost:4000/api/users')
  .then(res => console.log(res.data))
  .catch(err => console.log(err))
})
  return (
    <div className="App">
      <header className="App-header">
        <h1>Users</h1>
        


      </header>
    </div>
  );
}

export default App;
