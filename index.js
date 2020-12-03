const express = require('express'); 
const logger = require('./middleware/logger'); 
const helmet = require('helmet'); 
const cors = require('cors'); 
const dotenv = require('dotenv'); 


const app = express(); 
app.use(express.json());
app.use(cors()); 
app.use(helmet('dev')); 
app.use(logger); 


dotenv.config(); 
const port = process.env.PORT || 5000; 


// Import Routes 
const userRoutes = require('./users/userRouter'); 
const postsRoutes = require('./posts/postRouter'); 

//custom middleware

app.use('/api', userRoutes); 
app.use('/api', postsRoutes);






app.listen(port, () => console.log('server is up on port ' + port)); 
