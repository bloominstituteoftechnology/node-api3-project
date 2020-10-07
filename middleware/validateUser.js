//I don't know if this does anything
const userDb = require("../users/userDb");
//Guess at making status work
const express = require('express');


function validateUser(res, req, next) {
    if(!req.body) {
        res.status(400).json({message: "missing user data"});
    }
    else if (!req.body.name) {
        res.status(400).json({message: "Missing required name field"});
    }
    next();
}

module.exports = validateUser; 