// code away!
const express = require('express');

//Instead of initiating dotenv config here,
//we are adding a -r flag to the server initiator code
//in the package.json file

// const dotenv = require('dotenv')

// dotenv.config()

const helmet = require('helmet');

const logger = require('./middleware/logger');

const userRoutes = require('./users/userRouter');
const postRoutes = require('./posts/postRouter');


const server = express();

server.use(helmet())

server.use(logger());


//Using some middleware to parse request body if its JSON
server.use(express.json());


//Using imported userRoutes
server.use('/users', userRoutes);
server.use('/posts', postRoutes);


//Home Page
server.use('/', (req, res) => {

    const name = process.env.MY_NAME

    res.send(`Welcome To ${name}'s Page`)
  });




 


const port = 5000;

const host = "127.0.0.1";

// watch for connections on port 5000
server.listen(port, host, () =>
  console.log('Server running on http://localhost:5000')
);