// require your server and launch it

const server = require('./server.js');
require('dotenv').config();
const port = process.env.PORT || 5000;
server.get('/secret', (req, res) => {
  res.status(200).json({ message: process.env.MESSAGE });
})
server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`);
});