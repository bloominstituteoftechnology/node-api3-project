const server = require("./server.js");
const port = 5000;
server.listen(5000, () => {
  console.log(`\n* Server running on http://localhost${port}`);
});
