// code away!
const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const pokemonRouter = require("./pokemon/pokemonRouter");
const logger = require("./middleware/logger");
const cors = require("cors");

const server = express();
const port = process.env.PORT || 4000;

server.use(express.json());
server.use(cors());


server.use(logger());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/pokemon", pokemonRouter);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
