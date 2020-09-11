import React, {useState, useEffect} from 'react';
import Details from './Details';
import {useParams} from 'react-router-dom';
import axios from 'axios';


const User = (props) =>{

    const id = props.users.id;
    const [posts, setPosts] = useState([])

    // console.log(posts);     
  
    const showDetails =()=>{
        axios
        .get(`http://localhost:4000/api/users/${id}/posts`)
        .then(result =>{
            console.log(result.data.text);
            setPosts(result.data.text);
        })  
        .catch(error=>{
            console.log(error);
        })
    }
  
    useEffect(()=>{
      showDetails()
    }, [])
   

    return(
        <div>
            <div key={props.users.id}>
            <h1>{props.users.name}</h1>
            <button onClick={showDetails} >Posts</button>
            {/* {posts.map(post=><Details posts={post}></Details>)} */}
            </div>
        </div>
        
    )
}

export default User;