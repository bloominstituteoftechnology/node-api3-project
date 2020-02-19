const express = require("express")

const server = express()
const port = 4000

server.use(express.json())

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some middleware!</h2>`);
  });

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})