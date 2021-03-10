// require your server and launch it
const express = require("express");
const morgan = require("morgan");
// const noInsomnia = require('./middleware/no-insomnia')
const logger = require("./middleware/logger");
const userRouter = require("./users/userRouter");

const server = express();
const port = process.env.PORT || 5000;

server.use(express.json());
// server.use(noInsomnia())
server.use(morgan("combined"));

server.use(logger('long'))

server.use(userRouter);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 