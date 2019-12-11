// code away!
const express = require('express');

const server = express();

//Using some middleware to parse request body if its JSON
server.use(express.json());



// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  
    res.send('Welcome to My API2 Home Page');
    
  });


function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
        'Origin'
      )}`
    );
  
    next();
  }


  
const port = 5000;

const host = "127.0.0.1";

// watch for connections on port 5000
server.listen(port, host, () =>
  console.log('Server running on http://localhost:5000')
);