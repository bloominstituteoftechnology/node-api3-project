const express = require('express');
const port=8000
const server = express();
const userRouter=require("./users/userRouter")

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });
server.use(express.json())
//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`);

  next();
}

server.use(logger)
server.use(userRouter)
server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong, please try again later.",
	})
})
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})


module.exports = {
  server,
  
  
};
