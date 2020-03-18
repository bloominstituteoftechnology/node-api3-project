const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const morgan = require("morgan");
const hubsRouter = require("./hubs/hubs-router.js");
const server = express();
server.use(express.json());
server.use(helmet());
server.use(methodLogger);
server.use(morgan("dev"));
server.use(addName);
server.use(lockout);

server.use("/api/hubs", hubsRouter);
server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});
//this is custom middleware
function methodLogger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}
//lockout message! Causes the request stack to stop
function addName(req, res, next) {
  req.name = req.name || "Rufus";
  next();
}

function multipleOf3(req, res, next) {
  if (Date.now() % 3 === 0) {
    res.status(403).json({ message: "You shall not pass!" });
  } else {
    next();
  }
}
// function lockout(req, res, next) {
//   res.status(403).json({ message: "api lockout in force" });
// }

//validation
function validateId(req, res, next) {
    const {id} = req.params;
    db.findById(id).then(
        value => {
            if(value) {
                req.value = value;
                next();
            } else {
                res.status(404).json({message:'hub id not found'})
            }
        }
    ).catch(err => {res.status(500).json({message:'failed', err})})
}
//example using validation 
//substack - small stack of middleware bound to a path
router.get('/:id', validateId, requiredBody, (req,res) => {
    res.status(200).json(req.hub);
})
router.get('/:id', [validateId, requiredBody], (req,res) => {
    res.status(200).json(req.hub);
})

router.delete('/:id', validateId, (req, res) => {
    Hubs.remove(req.params.id)
})
//next moves us from one middleware to the next
module.exports = server;


//example with router

router.use((res,res,next) => {
    console.log('hubs sections');
    next();
})

function requiredBody(req, res, next) {
    const body = req.body;
    !body || body==={} ? res.status(400).json({message: 'Please include request body'}) : next();
}

router.post('/', requiredBody, postUser)
router.delete('/:id', validateId, deleteUser)

app.use((error, req, res, next) => {
    res.status(400).json({message:'bad panda!', error})
})

// else(next({message: "hub not found"}))