// code away!
const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 4000
const server = require('./server');

const app = express()
app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
