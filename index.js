// import depend
const express = require("express")

//import middleware
const welcome = require('./server')
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
const logger = require('./middleware/logger')

// init mainServ
const mainServ = express()
const port = process.argv[2] || 4000
const {pt,debugHelper,getAllValues} = require("../../../2020 dev/MY SCRIPTS/shrinker")

mainServ.use(express.json())
mainServ.use(logger())
mainServ.use(getAllValues(__filename))
// mainServ.use(welcome)
mainServ.use(postRouter)
mainServ.use(userRouter)


//error catching
mainServ.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).json({message:"Something went wrong"})
})





mainServ.listen(port, ()=>{
    const port2 =["null",{name:"daniel"},[{value:"welp"}]]
    pt('server started on port',port)
    // pt("current directory maybe?",__filename)
    getAllValues(__filename)

    // debugHelper(port2, "Character List Test")


})
