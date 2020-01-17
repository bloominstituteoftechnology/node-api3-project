// GREETER

function Greeter(req, res, next) {
  res.status(200).json({ hi: "there" });
}
// how come we don't call next() here?

// LOGGER

function Logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log(`${method} to ${originalUrl}`);

  next();
}

// GATEKEEPER

function GateKeeper(req, res, next) {
  if ((res.headers.password = "mellon")) {
    next();
  } else {
    res.status(401).json({ you: "shall not pass!" });
  }
}

// CHECK
// Takes the name of a property and checks that the body has that property.
// If the property is not there, status code 400 and error message: property required.
// Use on POST and PUT to check that the body has the "name" property

function Check(prop) {
  return function(req, res, next) {
    if (req.body[prop]) {
      // the square brackets allow us to extract the value of the property, I think, I'm not sure
      next();
    } else {
      res.status(400).json({ errorMessage: `required ${prop}` });
    }
  };
}

// CHECK THE FANCY WAY

// module.exports = (prop) => (req, res, next) =>
// req.body[prop]
// ? next()
// : res.status(400).json({ errorMessage: `required${prop}`});

// UPPPERCASER
function Uppercaser(req, res, next) {
  if (typeof req.body.name === "string") {
    req.body.name = req.body.name.toUppercase();
    // req.name.age = 50
    // delete req.foo;

    next();
  } else {
    res.status(400).json({ errorMessage: "the name should be a string" });
  }
}

// module.exports = server;
