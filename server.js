const express = require("express");

//routes
const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");

const server = express();

//custom middleware use here
server.use(express.json());
server.use(logger);

server.use("/api/post", postRouter);
server.use("/api/user", userRouter);

server.get("/", (req, res) => {
  res.send(
    `<h2>API Project 3</h2> <p>See all the Endpoints below</p>
<table>
  <tr>
    <th>User Endpoints</th>
    <th>What Type of Request</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>/api/user</td>
    <td>GET</td>
    <td>Get all users</td>
  </tr>
  <tr>
    <td>/api/user/:id</td>
    <td>GET</td>
    <td>Get a specific user</td>
  </tr>
  <tr>
    <td>/api/user/:id/post</td>
    <td>GET</td>
    <td>Get specific user post</td>
  </tr>
  <tr>
    <td>/api/user/:id</td>
    <td>PUT</td>
    <td>Update user data</td>
  </tr>
  <tr>
    <td>/api/user/:id</td>
    <td>DELETE</td>
    <td>Delete a user data</td>
  </tr>
  <tr>
    <td>/api/user</td>
    <td>POST</td>
    <td>Post a new user</td>
  </tr>
</table>
<br>
<table>
  <tr>
    <th>Post Endpoints</th>
    <th>What Type of Request</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>/api/post</td>
    <td>GET</td>
    <td>Get all posts</td>
  </tr>
  <tr>
    <td>/api/post/:id</td>
    <td>GET</td>
    <td>Get a specific post</td>
  </tr>
  <tr>
    <td>/api/post/:id</td>
    <td>PUT</td>
    <td>Update a specific post</td>
  </tr>
  <tr>
    <td>/api/post/:id</td>
    <td>DELETE</td>
    <td>Delete a specific post</td>
  </tr>
</table>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
`
  );
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `Request -->${req.method}  URL -->${req.url}  timestamp -->${new Date()}`
  );
  next();
}

module.exports = server;
