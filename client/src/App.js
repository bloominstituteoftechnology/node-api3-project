import React, { useState, useEffect } from "react";
import "./App.scss";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Axios from "axios";
import Loader from "react-loader-spinner";
import Data from "./Data";

function App() {
  const [user, setUser] = useState({ name: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/users")
      .then(
        res =>
          console.log(res, "GET") &
          setData(res.data) &
          setTimeout(() => {
            setLoading(false);
          }, 1500)
      )
      .catch(err => console.log(err));
  }, [loading]);

  const handlesubmit = e => {
    e.preventDefault();
    Axios.post("http://localhost:5000/api/users", user)
      .then(
        res =>
          console.log(res, "post") & setLoading(true) & setUser({ name: "" })
      )
      .catch(err => console.log(err, "error"));
  };

  const handleEdit = id => {
    Axios.put(`http://localhost:5000/api/users/${id}`, user)
      .then(
        res =>
          console.log(res, "post") & setLoading(true) & setUser({ name: "" })
      )
      .catch(err => console.log(err, "post"));
  };
  const handleDelete = id => {
    Axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(
        res =>
          console.log(res, "delete") & setLoading(true) & setUser({ name: "" })
      )
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='App'>
      <Form style={{ marginLeft: "8%" }} onSubmit={handlesubmit}>
        {console.log(user, "user")}
        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
          <Label className='mr-sm-2'>
            name:
            <Input
              type='text'
              name='name'
              placeholder='Name'
              value={user.name}
              onChange={handleChange}
            />
          </Label>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      <div
        style={{
          display: "flex",
          width: "50%",
          margin: "0 auto",
          flexWrap: "wrap"
        }}>
        {loading && (
          <div style={{ margin: "0 auto", marginTop: "10%" }}>
            <Loader
              type='Puff'
              color='#00BFFF'
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        )}
        {data && !loading && (
          <>
            {data.map(ele => (
              <Data
                ele={ele}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                loading={loading}
                setLoading={setLoading}
                key={ele.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
