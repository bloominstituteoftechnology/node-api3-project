import React, {useState, useEffect} from 'react';
import User from './components/User';
import Details from './components/Details';
import axios from 'axios';

import './App.css';

function App() {
  const [users, setUsers] = useState([])
  // const [posts, setPosts] = useState([])

  // console.log(posts);     

  // const showDetails =(id)=>{
  //     axios
  //     .get(`http://localhost:4000/api/users/${id}/posts`)
  //     .then(result =>{
  //         setPosts(result.data.text);
          
  //     }, [id])  
  // }

  // useEffect(()=>{
  //   showDetails()
  // }, [])

  useEffect(()=>{
    axios
    .get('http://localhost:4000/api/users')
    .then(result =>{
      // console.log(result.data)
      setUsers(result.data);
    })


  }, [])
  return (
    <div className="App">
      {users.map(user=><User users={user}></User>)}
      {/* {posts.map(post=><Details posts={post}></Details>)} */}
    
    </div>
  );
}

export default App;
