import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import axios from "axios";

const Title = styled.h1`
  font-family: 'Balsamiq Sans', cursive;
  text-shadow: 2px 2px black;
`

const TitleContainer = styled.div`
  color: white;
  background: dodgerblue;
  width: 200px;
  margin: 15% auto 0 auto;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-shadow: 5px 5px black;
`

const StyledLabel = styled.label`
  color: white;
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 15px auto;
  align-items: center;
  input {
    margin-top: 5px;
    border-radius: 5px;
    padding: 5px;
  }
  textarea {
    border-radius: 5px;
    padding: 5px;
    height: 100px;
    width: 300px
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    border: none;
    background: DarkOrchid;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 2px 2px black;
    opacity: 0.7;
    transition: opacity 0.5s;
    margin-bottom: 20px;
    &:hover {
      opacity: 1;
    }
    &:active {
      background: darkorange;
    }
  }
`

const PostCard = styled.div`
  background: white;
  color: black;
  width: 300px;
  box-shadow: 5px 5px black;
  margin-bottom: 10px;
  padding: 10px;
  div {
    text-align: right;
    color: white;
    span:first-child {
      background: mediumseagreen;
      margin-right: 10px;
    }
    span {
      background: red;
      border-radius: 5px;
      padding: 2px 5px;
      cursor: pointer;
    }
  } 
`

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PostLabel = styled.div`
  color: white;
  background: dodgerblue;
  box-shadow: 5px 5px black;
  width: 200px;
  margin-bottom: 20px;
  text-align: center;
  h3 {
    font-family: 'Balsamiq Sans', cursive;
    font-weight: 400;
    text-shadow: 1px 1px black;
  }
`

function App() {

  const [ user, setUser ] = useState()
  const [ posts, setPosts ] = useState()
  const [ username, setUsername ] = useState("")
  const [ error, setError ] = useState("Username?")
  const [ message, setMessage ] = useState("")
  const [ edit, setEdit ] = useState("")

  const handleGetPosts = () => {
    axios.get('http://localhost:4000/post/')
    .then(res => {
      setPosts(res.data)
      console.log(res)
    })
    .catch(err => {
      setError("Error!")
    })
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    if (e.target.name === "post") {
      axios[edit !== "" ? "put" : "post"](`http://localhost:4000/post/${edit}`, { text: message, user_id: user.id })
      .then(res => {
        console.log(res)
        setEdit("")
        setError("Post Stuff")
        setMessage("")
        handleGetPosts()
      })
      .catch(err => {
        setError("Error!")
      })
      return 
    }
    axios.post('http://localhost:4000/user/', { name: username })
    .then(res => {
      setError("Post Stuff")
      setUser(res.data)
      console.log(res)
      handleGetPosts()
    })
    .catch(err => {
      setError("Error!")
    })
  }

  const handleAction = (verb, id) => {
    axios[verb](`http://localhost:4000/post/${id}`)
    .then(res => {
      console.log(res)
      handleGetPosts()
    })
    .catch(err => setError("Error!"))
  }

  const handleEdit = post => {
    setEdit(post.id)
    setError("Editing...")
    setMessage(post.text)
    window.scrollTo(0, 0)
  }

  // useEffect(handleGetPosts, [])
  
  if (!posts) {
    return (
      <div className="App">
        <TitleContainer>
          <Title>P O S T</Title>
          <p>Simple posting app</p>
        </TitleContainer>
        <StyledForm onSubmit={handleOnSubmit}>
          <StyledLabel>
            {error}
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </StyledLabel>
          <button type="submit">Submit</button>
        </StyledForm>
      </div>
    );
  }
  else {
    return (
      <PostContainer>
        <StyledForm name="post" onSubmit={handleOnSubmit}>
          <StyledLabel>
            <PostLabel><h3>{error}</h3></PostLabel>
            <textarea value={message} onChange={e => setMessage(e.target.value)}></textarea>
          </StyledLabel>
          <button type="submit">Submit</button>
        </StyledForm>
        {posts && posts.map(post => (
          <PostCard key={post.id}>
            <p>{post.text}</p>
              {user && user.id === post.user_id && (
                <div>
                  <span onClick={e => handleEdit(post)}>Edit</span>
                  <span onClick={e => handleAction('delete', post.id)}>Delete</span>
                </div>
              )}
          </PostCard>
        ))}
      </PostContainer>
    )
  }
}

export default App;
