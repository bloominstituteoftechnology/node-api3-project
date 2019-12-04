const express = require('express');

//use globally
const logger = (req,res,next)=>{
    console.log(`the request:${req.method} made to:${req.originalUrl}`)
    next();
}

const validateUser = (req,res,next)=>{
    if(req.body.userId){
        next();
    }else{
        res.status(400).json({message:'invalid user id'})
    }
}

