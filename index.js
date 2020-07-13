require("dotenv").config();
const server = require("./server.js");
//const PORT = 8000;
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`);
});
