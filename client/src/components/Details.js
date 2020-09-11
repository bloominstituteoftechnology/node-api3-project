import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const Details = (props) =>{
    // const {id} = useParams();
    // const [posts, setPosts] = useState([])

    // console.log(posts);     
  
    // const showDetails =()=>{
    //     axios
    //     .get(`http://localhost:4000/api/users/${id}/posts`)
    //     .then(result =>{
    //         setPosts(result.data.text);
            
    //     })  
    // }
  
    // useEffect(()=>{
    //   showDetails()
    // }, [])
    console.log("in the details",props);
  
    return(
        <p key={props.posts.id}>{props.posts.text}</p>
    )
}

export default Details;