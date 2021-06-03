const express = require('express');
const cors = require('cors')
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use(cors())

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((req, res, next) => {
  // we either call next or we send a response res.json, res.send, res.end
  res.set('X-Web42', 'rocks!')
  console.log(`[${req.method}] ${req.path}`)
  next()
})

server.use(express.json());

server.use('/api/hubs', hubsRouter); // all verbs GET, POST etc

server.use('*', (req, res) => { // catch all
  res.status(404).send(`
    <h2>Lambda Hubs API</h2>
    <p>Oops, can't find that!</p>
  `);
});

server.use((err, req, res, next) => { // eslint-disable-line
  // DO NOT DELETE NEXT FROM YOUR ERR HANDLING MIDDLEWARE
  console.log('err handling midd kicking in!', err.message)
  res.status(err.status || 500).json({
    custom: 'something exploded inside the app',
    message: err.message,
    stack: err.stack,
  })
});

module.exports = server;
