// code away!
require("dotenv").config();
const server = require("./server");

server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`);
});
