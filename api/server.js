const express = require('express');//importing commonJS module
const morgan = require("morgan")//morgan gives request/response info
const helmet = require("helmet")//helmet protects headers
const userssRouter = require('./users/users-router');
const {checkWord, logQuote} = require("./middleware/middlewares.js")

const server = express();
server.use(helmet())
server.use(morgan("dev"))

server.use(logQuote("nickel"))
// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here
server.use('/api/hubs',checkWord, logQuote("nickel"), userssRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;


// const express = require('express'); // importing a CommonJS module

// const hubsRouter = require('./hubs/hubs-router.js');
// const {checkWord, logQuote} = require("./middleware/middlewares.js")
// const server = express();

// 
// 
// server.use(helmet())
// server.use(morgan("dev"))
// server.use(express.json());
// //server.use(logQuote("nickel"))

// server.use('/api/hubs',checkWord, logQuote("nickel"), hubsRouter);

// server.get('/', (req, res) => {
//   res.send(`
//     <h2>Lambda Hubs API</h2>
//     <p>Welcome to the Lambda Hubs API</p>
//   `);
// });

// module.exports = server;

