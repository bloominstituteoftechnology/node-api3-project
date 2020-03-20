import React, { useState, useEffect } from 'react';
import {
  CardColumns,
  Card,
  CardTitle,
  CardText,
  CardBody,
  Button,
} from 'reactstrap';

import axios from 'axios';
import AddUser from './AddUser';

const UserList = () => {
  const [usersList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/users/')
      .then((response) => {
        setPostList(response.data);
      })
      .catch((err) => (err));
  }, [usersList]);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:4000/api/users/${id}`)
      .then((res) => (res))
      .catch((err) => (err));
  };

  return (
    <div>
      <AddUser usersList={usersList} setPostList={setPostList} />
      <div className="cards-wrapper">
        <CardColumns>
          {usersList.map((post) => (
            <Card key={post.id}>
              <CardBody>
                <CardTitle>
                  Name:
                  {post.name}
                </CardTitle>
                <CardText>
                  Id:
                  {post.id}
                </CardText>
                <Button onClick={() => deleteUser(post.id)}>Delete</Button>
                <Button>View posts</Button>
              </CardBody>
            </Card>
          ))}
        </CardColumns>
      </div>
    </div>
  );
};
export default UserList;