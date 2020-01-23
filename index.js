require("dotenv").config();

// code away!

const server = require("./server.js");
const port = process.env.PORT || 3100;

server.listen(port, () => {
  console.log(`*** listening on port ${port}`);
});
