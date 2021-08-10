// require your server and launch it
const express = require('express');
const server = express();


const port = 5000;

server.listen(() => {
    console.log(`Server listening on port ${port}`);
})