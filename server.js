const express = require('express');
const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")

const server = express();
const port = process.env.PORT || 4000

server.use(express.json())

server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)

server.get('/', (req, res) => {
  res.send(process.env.SECRET_MESSAGE || `<h2>Let's write some middleware!</h2>`);
});

server.use((req, res) => {
	res.status(404).json({
		message: "Route was not found",
	})
})

server.use((err, req, res, next) => {
  console.log(err)
    res.status(500).json({
      message: 'Error retrieving the user'
 })
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})

//custom middleware

function logger(req, res, next) {

}

