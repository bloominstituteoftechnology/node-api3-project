// code away!

const express = require('express');
const server = require('./server');

const router = require('./users/userRouter');

const app = express();

app.use('/', server)
app.use('/users', router);


// app.get('/', (req, res) => {
//     res.send('Welcome Home');
// })

app.listen(8000, console.log("The magic is on 8000"));