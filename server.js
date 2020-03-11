const express = require('express')
const helmet = require('helmet')
const postRouter = require('./posts/postRouter')
const userRouter = require('./users/userRouter')

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

// server.use('/posts', postRouter)
// server.use('/users', userRouter)

const users = [] // each user has { name: 'Gabe', age: 43 }
server.post('/users', validateName, validateAge, (req, res) => {
  // has to have body
  // hast to have body.name
  // has to have body.age
  // name has to be over three chars
  // age has to be a number
  // age has to be a number over 18

  users.push({ name: req.cleanName, age: req.cleanAge })
  res.status(201).json(users)
})

server.get('/friend', (req, res) => {
  res.send(`<h2>Hello, friend ${req.friend.name}</h2>`);
})

server.get('/:id', (req, res) => {
  res.send(`<h2>That is a nice id: ${req.params.id}</h2>`);
})

//custom middleware
function validateAge(req, res, next) {
  if (!req.body.age) {
    res.status(422).json({ message: 'age is required' })
  } else if (isNaN(req.body.age)) {
    res.status(422).json({ message: 'that age does not look lika a number' })
  } else if (Number(req.body.age) < 18) {
    res.status(422).json({ message: 'that age is too young' })
  } else {
    req.cleanAge = Number(req.body.age)
    next()
  }
}

function validateName(req, res, next) {
  if (!req.body.name) {
    res.status(422).json({ message: "name is required" })
  } else if (req.body.name.trim().length < 5) {
    res.status(400).json({ message: "name should be at least 5 characters" })
  } else {
    req.cleanName = req.body.name.trim()
    next()
  }
}

function logger(req, res, next) { }

module.exports = server;
