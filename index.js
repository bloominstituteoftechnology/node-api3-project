// code away!
require("dotenv").config();
const server = require("./server");

const port = process.env.PORT || 4000;

server.get("/", (req, res) => {
  res.status(200).json({
    message: `Welcome ${process.env.COHORT}`,
    fact: process.env.FUN_FACT || "I have no fun facts",
  });
});

server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`);
});
