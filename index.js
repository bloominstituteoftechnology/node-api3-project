// code away!
const server = require('./server');

const PORT = 5500;
server.listen(PORT, () => {
    console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`)
});

// const express = require('express');

// const morgan = require('morgan');

// const helmet= require('helmet');

// server.use(morgan('dev'));

// server.use(helmet());

// server.use(express.json());

//



