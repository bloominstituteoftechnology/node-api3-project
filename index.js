// code away!
const server = require("./server.js");

const port = 4000;
server.listen(4000, () => {
  console.log("Server listening on port 4000...");
});

//Why do we have both index.js and server.js here? Is it because you can only put the location in index.js?