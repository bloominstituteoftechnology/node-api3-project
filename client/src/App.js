import React,{useState} from 'react';
import Home from './Home';
import UserInfo from './UserInfo';
import {Route} from 'react-router-dom';
import './App.css';

function App() {
  const [users,setUsers]=useState([]);

  return (
    <div className="App">
        <h1>Hello! Hobbit World</h1>
      <Route exact path="/">
       <Home users={users} setUsers={setUsers}/>
       </Route>
       <Route exact path="/users/:id">
       <UserInfo users={users} setUsers={setUsers}/>
       </Route>
    </div>
  );
}

export default App;
