// require your server and launch it
const dotenv = require('dotenv').config()
const express = require('express')


const server = require('./api/server');

const PORT = process.env.PORT || 8000;

server.listen(PORT, () =>{
    console.log(`\n* Server Running on http://localhost:${PORT} *\n`);
});
