const express = require("express");
const app = require("./server")
 

//const server = express();
const port = process.env.PORT || 5001;

 //server.use(express());



app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});

   

