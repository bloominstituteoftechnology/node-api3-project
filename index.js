  
const port = process.env.PORT || 8675;

const server = require("./server.js");

server.listen(port, () => console.log(`\n server is listening on ${port} \n`))