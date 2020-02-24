const port = access.env.PORT || 3000;

const server = require("./server.js");

server.listen(port, () => console.log(`\n server is listening on port ${port} \n`));