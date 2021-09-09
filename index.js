require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { logger } = require("./backend/middleware/middleware");
const express = require("express");

const app = require("./backend/api/server");
const helmet = require("helmet");
const usersRouter = require("./backend/api/users/users-router");

const PORT = process.env.PORT || 3003;

app.use(morgan());
app.use(helmet());
app.use(express.json());
app.use(logger);
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
