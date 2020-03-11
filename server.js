const express = require('express')
const helmet = require('helmet')
const server = express()

// plug in the body parsing ability
server.use(express.json())

// plug in the header overrides with the helmet lib
// the helmet variable, as imported, is a FUNCTION THAT RETURNS A FUNCTION MIDDLEWARE
server.use(helmet())

// connect it here, a m. that writes a more generic X-Powered-By
server.use(function (req, res, next) {
  req.friend = { id: 1, name: 'Alison' }
  // res.header('X-Powered-By', 'Do not be nosy')
  // res.header('Lambda-Header', 'Have fun')
  next()
})

const users = [] // each user has { name: 'Gabe', age: 43 }
server.post('/users', (req, res) => {
  users.push(req.body)
  res.status(201).json(users)
})

server.get('/friend', (req, res) => {
  res.send(`<h2>Hello, friend ${req.friend.name}</h2>`);
})

server.get('/:id', (req, res) => {
  res.send(`<h2>That is a nice id: ${req.params.id}</h2>`);
})

//custom middleware

function logger(req, res, next) { }

module.exports = server;
