// code away!
const server = require("./server.js");

const port = process.env.PORT || 5000;
server.listen(4000, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`);
});
