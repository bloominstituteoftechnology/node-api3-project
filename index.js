// code away!
const express = require('express');

const morgan = require('morgan');

const helmet= require('helmet');

const userRouter = require('./users/userRouter');

server.use(morgan('dev'));

server.use(helmet());

server.use(express.json());

module.exports = server;



