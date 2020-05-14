require('dotenv').config()
const app = require('./server')

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is up and listening at port: ${PORT}`)
})

