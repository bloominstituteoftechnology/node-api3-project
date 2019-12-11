const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.send('hello, weclome to the API')
})

module.exports = router