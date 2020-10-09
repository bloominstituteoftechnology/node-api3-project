// code away!
const express = require('express');
const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")


const server = express();
const port = 5000
server.use(express.json())
//put in a router
// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

//custom middleware
server.use(logger("long"))

server.use(postRouter)
server.use(userRouter)


//error middleware with 4 params
server.use((err, res, req, next)=> {
    console.log(err);
    res.status(500).json({
        message: "Please try again later, somethinh went wrong",
    })
})
server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})