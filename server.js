const express = 'express';

const server = express();

server.get('/', (req, res) => {
  
});

//custom middleware

function logger(req, res, next) {

};

module.exports = server;
