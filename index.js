// import depend
const express = require("express")

//import middleware
const welcome = require('./server')
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const logger = require('./middleware/logger');

// init mainServ
const mainServ = express()
const port = process.argv[2] || 4000

mainServ.use(express.json())
mainServ.use(logger())
// mainServ.use(welcome)
mainServ.use(postRouter)
mainServ.use(userRouter)


//error catching
mainServ.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).json({message:"Something went wrong"})
})





mainServ.listen(port, ()=>{
    console.log(`server started on port --> ${port}`)
})
