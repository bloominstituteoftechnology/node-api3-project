import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';



function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4001/api/users')
      .then(res => {
        console.log(res)
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  

  const getUsers = id => {
    axios
    .get(`http://localhost:4001/api/users/${id}`)
    .then(res => {
      // setPosts(posts.filter(user => user !== res.data));
      if(id === res.data.id) {
        return res.data;
      }
      getUsers();
  }) 
  .catch(err => {
      console.log(err.res, err.message)
  })
  };

  // useEffect(() => {
  //   getUsers();
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Users</h1>
        <h3>Click each user to see more</h3>
        {users.map((user) => (
          <p key={user.id} onClick={getUsers}>{user.name} {user.user_id}</p>
                    
        ))}
      </header>
    </div>
  );
}

export default App;
