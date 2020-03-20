// code away!
require("dotenv").config();
const server = require("./server.js");

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Brett's Server Running on http://localhost:${port}`);
});
