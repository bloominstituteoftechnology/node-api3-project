import React, { useState } from 'react';
import {
  Label,
  Row,
  Col,
  Form,
  Input,
  Button,
  FormGroup,
  Container,
} from 'reactstrap';

import axios from 'axios';
import Navigation from './Navigation';

const AddUser = () => {
  const [newUser, setNewUser] = useState('');

  const handleChangesAdd = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/api/users', newUser)
      .then((res) => (res))
      .catch((err) => (err));
  };
  return (
   <div>
     <Navigation/>
     <Container>
      <Row>
        <Col xs="12" md={{ size: 8, offset: 3 }}>
          <Form onSubmit={handleAdd}>
            <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChangesAdd}
              />
            </FormGroup>
            {/* <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
              <Label for="content">Content</Label>
              <Input
                type="textarea"
                name="contents"
                placeholder="Content"
                onChange={handleChangesAdd}
              />
            </FormGroup> */}
            <Button style={{ display: 'flex', alignItems: 'center' }}>Add new user</Button>

          </Form>
        </Col>
      </Row>
    </Container>
   </div>
  );
};
export default AddUser;
