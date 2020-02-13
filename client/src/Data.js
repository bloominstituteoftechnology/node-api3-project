import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Badge
} from "reactstrap";
import Axios from "axios";

const Data = ({ ele, handleEdit, handleDelete, loading, setLoading }) => {
  const [comment, setcomment] = useState({ text: "" });
  const [state, setstate] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/users/${ele.id}/posts`)
      .then(
        res =>
          console.log(res, "GET") &
          setstate(res.data) &
          setTimeout(() => {
            setLoading(false);
          }, 1500)
      )
      .catch(err => console.log(err));
  }, [loading, setLoading, ele.id]);

  const handleChange = e => {
    e.preventDefault();
    setcomment({ ...comment, [e.target.name]: e.target.value });
  };

  const handlesubmit = e => {
    e.preventDefault();
    Axios.post(`http://localhost:5000/api/users/${ele.id}/posts`, comment)
      .then(
        res =>
          console.log(res, "post") & setLoading(true) & setcomment({ text: "" })
      )
      .catch(err => console.log(err, "error"));
  };

  const commentdelete = (e, id) => {
    e.preventDefault();
    Axios.delete(`http://localhost:5000/api/posts/${id}`)
      .then(
        res =>
          console.log(res, "delete") &
          setLoading(true) &
          setcomment({ text: "" })
      )
      .catch(err => console.log(err));
  };

  const handlecommentEdit = (e, id) => {
    e.preventDefault();
    Axios.put(`http://localhost:5000/api/posts/${id}`, comment)
      .then(
        res =>
          console.log(res, "post") & setLoading(true) & setcomment({ text: "" })
      )
      .catch(err => console.log(err, "post"));
  };

  return (
    <div className='comments-container' style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Form onSubmit={handlesubmit}>
          <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
            <Label className='mr-sm-2'>
              {console.log(comment)}
              Comment:
              <Input
                type='textarea'
                name='text'
                placeholder='Text here'
                value={comment.text}
                onChange={handleChange}
              />
            </Label>
          </FormGroup>
          <Button color='info' size='sm'>
            Submit
          </Button>
        </Form>
      </div>

      <Card
        key={ele.id}
        body
        inverse
        style={{ backgroundColor: "#333", borderColor: "#333" }}>
        {console.log(state, "state")}
        <CardTitle>
          <h3>{ele.name}</h3>
        </CardTitle>
        <>
          {state.length === 0 ? (
            <h4 style={{ textDecoration: "underline", marginBottom: "3%" }}>
              No Posts
            </h4>
          ) : (
            <CardTitle>
              <p style={{ textDecoration: "underline", fontWeight: "600" }}>
                Posts :
              </p>

              {state.map(data => (
                <div key={data.id}>
                  <p>
                    {data.text}
                    <Badge
                      onClick={e => handlecommentEdit(e, data.id)}
                      color='warning'
                      pill>
                      Edit
                    </Badge>
                    <span
                      style={{
                        color: "red",
                        fontWeight: "700",
                        fontSize: "1rem",
                        marginLeft: "1%",
                        cursor: "pointer"
                      }}
                      onClick={e => commentdelete(e, data.id)}>
                      X
                    </span>
                  </p>
                  {/* {data.id} */}
                </div>
              ))}
            </CardTitle>
          )}
        </>
        <Button onClick={() => handleEdit(ele.id)} color='warning'>
          Edit
        </Button>
        <Button onClick={() => handleDelete(ele.id)} color='danger'>
          Delete
        </Button>
      </Card>
    </div>
  );
};

export default Data;
