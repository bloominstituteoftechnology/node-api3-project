const express = require('express');
const PostRouter = require('./posts/postRouter');
const UserRouter = require('./users/userRouter');
const Utils = require('./MiddleWare/Utils')

const app = express();
app.use(express.json());
app.use(Utils.logger);

app.use('/posts', PostRouter);
app.use('/users', UserRouter);

app.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = app;
