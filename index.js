// code away!
const server = require("./server.js");

const port = 8000;

server.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});