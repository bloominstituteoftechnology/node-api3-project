import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/users')
      .then(res => {
        console.log(res)
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>test app</h1>
        {users.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </header>
    </div>
  );
}

export default App;
