// code away!
const port = 5000;
const server = require('./server')
const express = require('express')
// server.use(express.json())

server.listen(port, () => {
    console.log(`listenin on port ${port}`)
})