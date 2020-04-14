const server = require("./server"); // imports server from api

server.listen(4021, () => {
  console.log("\n*** Server Running on http://localhost:4021 ***\n"); // sets port to 5000
});