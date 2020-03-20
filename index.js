require('dotenv').config()
const app = require('./server.js');

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`\n*** Server Running on http://localhost:${PORT} ***\n`)
})