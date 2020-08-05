const express = require("express");
const Users = require("./userDb");

module.exports = (req, res, next) => {
  let requestedUser = req.params.id;

  Users.getById(requestedUser)
    .then((response) => {
      req.user = response;
    })
    .catch((error) => {
      return res.status(400).json({ message: "invalid user id" });
    });

  next();
};
