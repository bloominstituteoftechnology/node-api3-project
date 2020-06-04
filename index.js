// code away!
//start express
const express = require('express');
const server = express();
const router = require('./users/userRouter.js');

server.use(express.json());

// import router
server.use('/api/users', router);

server.get('/', (req, res) => {
  res.send({ message: 'Backend Node project 3' });
  res.status(200).json({ environment: process.env.NODE_ENV, port: process.env.PORT });
});

const port = process.env.PORT || 5000;
server.listen(5000, () => {
  console.log(
    '------------------------------------------\nserver is running on http://localhost:5000\n------------------------------------------ '
  );
});
