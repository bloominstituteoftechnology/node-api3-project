const express = require('express');
const data = require("./postDb");
const router = express.Router();


let logger = (req, res, next) => {
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
  let log = `[${formatted_date}] ${method}:${url} ${status}`;
  console.log(log);
  next();
};
router.use(logger);

router.get('/', (req, res) => {
  data.get()
  .then((posts)=>{
    res.status(200).json(posts)
  })
  .catch(()=>{
    res.status(500).json({error: `there is a server issue`})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id}= req.params;
  data.getById(id)
  .then((post)=>{
    res.status(200).json(post)
  })
  .catch(()=>{
    res.status(500).json({error: `there is no id ${id}`})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;
  data.remove(id)
  .then((post)=>{
    res.status(204).json(post)
  })
  .catch(()=>{
    res.status(404).json({error: `there is no id ${id}`})
  })
});

router.put('/:id',validateUserId, validatePost, (req, res) => {
  // do your magic!
  const {id} = req.params
  const change = req.body
  data.update(id, change)
  .then((one)=> {
    if(one === 1){res.status(200).json(one)} else{res.status(404).json({message: "PLease Provied The Correct ID"})}
    })
  .catch(()=> res.status(500).json({errorMessage: "Server Error"}) )
});
// custom middleware

function validateUserId(req, res, next) {
  data.getById(req.params.id)
      .then(user => {
          if (user) {
              console.log("user", user);
              next();
          } else {
              res.status(400).json({ message: "invalid user id" });
          }
      })
      .catch(error => {
          res.status(500).json({ message: error.message });
      });
}

function validatePost(req, res, next) {
  // do your magic!
  !req.body.text ? res.status(400).json({message: "Make Sure To Provied The Text"}) : next()
}

module.exports = router;
