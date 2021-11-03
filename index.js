// require your server and launch it
const server = require('./api/server')
const express = require('express')
require('colors')
const port = 8000

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`.cyan);
})