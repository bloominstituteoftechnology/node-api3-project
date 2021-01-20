import React, { useState,useEffect } from 'react';
import {useParams,useHistory} from 'react-router-dom';
import fetchPosts from './api/fetchPosts';
import PostList from './PostList';
import {Button} from 'reactstrap';

function UserInfo({users}){
    const [posts,setPosts]=useState([]);
    const {id}=useParams();
    const history=useHistory();

useEffect(()=>{
fetchPosts(id,setPosts)
},[])

const user= users.find(item=> item.id == id)

const handleBack=()=>{
 history.push('/')
}
    return(
        <div>
            {posts.length === 0? <p>No Posts yet for this user!</p> : 
            <div className="userList">
                <h3>Enjoy the posts of {user.name}!</h3>
                {posts.map(item=>{
                return <PostList key={item.id} item={item}/>
                })}
            </div>}
            <Button color="info" onClick={handleBack}>Back</Button>
        </div>
    )

}
export default UserInfo;