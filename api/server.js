const express = require('express');

const server = express();
function logger(req, res, next) {
  console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
          'Origin'
      )}`
  );

  next();
}

// function atGate(req, res, next) {
//   console.log("hit the auth gate");
//   next()
// }

// function auth(req, res, next) {
//   if (req.url === '/' ){
//     next()
//   } else {
//     res,send('Not Allowed')
//   }
// }


// remember express by default cannot parse JSON in request bodies
server.use(express.json())
server.use(logger)

// global middleware and the user's router need to be connected here



server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


server.use(function(req, res) {
  res.status(404).send(`<h1>Oops... you've stepped in the void!! This page is 404 NOT FOUND</h1>`)
});




module.exports = server;
