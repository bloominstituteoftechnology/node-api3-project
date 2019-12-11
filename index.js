// code away!
const express = require('express');

const userRoutes = require('./users/userRouter');
const postRoutes = require('./posts/postRouter');


const server = express();


//Using some middleware to parse request body if its JSON
server.use(express.json());





//Using imported userRoutes
server.use('/users', userRoutes);
server.use('/posts', postRoutes);



//Home Page
server.use('/', (req, res) => {
    res.send('Welcome To My Page')
  });



const port = 5000;

const host = "127.0.0.1";

// watch for connections on port 5000
server.listen(port, host, () =>
  console.log('Server running on http://localhost:5000')
);