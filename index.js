const server = require("./server.js");
require("dotenv").config();
const port = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`** Server Running on http://localhost:${PORT} **`);
});
