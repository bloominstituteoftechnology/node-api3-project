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
});

server.listen(5000, () => {
  console.log(
    '------------------------------------------\nserver is running on http://localhost:5000\n------------------------------------------ '
  );
}); 