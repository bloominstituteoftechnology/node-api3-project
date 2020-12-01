const express = require('express'); 
const logger = require('./middleware/logger'); 
const helmet = require('helmet'); 


const app = express(); 
app.use(express.json());
app.use(helmet('dev')); 
app.use(logger); 


// Import Routes 
const userRoutes = require('./users/userRouter'); 
const postsRoutes = require('./posts/postRouter'); 

//custom middleware

app.use('/api', userRoutes); 
app.use('/api', postsRoutes);





const PORT = 5000; 
app.listen(PORT, () => console.log('server is up on port ' + PORT)); 
