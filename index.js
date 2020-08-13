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

server.get('/', (req, res) => {
    res.send(`<h2>Here is a list of valid get endpoints:
<ul>
<li>/api/users/</li>
<li>/api/users/:id</li>
<li>/api/users/:id/posts</li>
<li>/api/posts/</li>
<li>/api/posts/:id</li>
<li>/api/pokemon/</li>
<li>/api/pokemon/:poke_num</li>
</ul>
</h2>`);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
