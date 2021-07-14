/* eslint-disable */
const User = require("../users/usersModel");

// function logger(req, res, next) {
//   // DO YOUR MAGIC
//   console.log(
//     `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
//       "Origin"
//     )}`
//   );
//   next();
//   res.status(200).json({ message: "some message" });
// }
// function atGate(req, res, next) {
//   console.log("At the gate, about to beeaten");
//   next();
// }
// function auth(req, res, next) {
//   if (req.url === "/") {
//     next();
//   } else {
//     res.send("You shall not pass!");
//   }
// }
// server.use(logger);
// server.use(atGate);
// server.get("/", logger, atGate, auth, (req, res) => {
//   console.log("Gate opening...");
//   console.log("Inside and safe!");
//   res.send("Welcome Traveler!");
// });

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "no such user" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "problem finding user" });
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    req.name = name.trim();
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (!text || !text.trim()) {
    res.status(400).json({ message: "missing required text" });
  } else {
    req.name = text.trim();
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  validateUserId,
  validateUser,
  validatePost,
  logger,
};
