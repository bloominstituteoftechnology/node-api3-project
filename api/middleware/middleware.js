const server = require("../server");

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
  res.status(200).json({ message: "some message" });
}

function atGate(req, res, next) {
  console.log("At the gate, about to beeaten");
  next();
}
function auth(req, res, next) {
  if (req.url === "/pass") {
    next();
  } else {
    res.send("You shall not pass!");
  }
}
// server.use(logger);
// server.use(atGate);
server.get("/pass", logger, atGate, auth, (req, res) => {
  console.log("Gate opening...");
  console.log("Inside and safe!");
  res.send("Welcome Traveler!");
});

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log("validate user id");
  next();
}
server.use(validateUserId);

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log("validate user");
  next();
}
server.use(validateUser);

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log("validate post");
  next();
}
server.use(validatePost);

// do not forget to expose these functions to other modules
