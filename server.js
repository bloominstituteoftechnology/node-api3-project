const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);


const { rawHeaders, httpVersion, method, socket, url } = req;
const { remoteAddress, remoteFamily } = socket;

console.log(
  json.stringify({
    timestamp: Date.now(),
    rawHeaders,
    httpVersion,
    method,
    remoteAddress,
    remoteFamily,
    url
  })
);
res.end()
});
//custom middleware

function logger(req, res, next) {}

module.exports = server;
