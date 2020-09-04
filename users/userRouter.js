const express = require('express');
const data = require("./userDb");
const { getUserPosts } = require('./userDb');
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

router.post('/', validateUser, (req, res) => {
  // do your magic!
  data.insert(req.body)
  .then((users)=>{
    res.status(201).json(users)
  })
  .catch((err)=>{
    res.status(500).json({error: err.message})
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  data.get()
  .then((users)=>{
    res.status(200).json(users)
  })
  .catch((err)=>{
    res.status(500).json({
      error: err.message
    })
  })
});

router.get('/:id', validateUserId,(req, res) => {
  // do your magic!
  const {id} = req.params;
  data.getById(id)
  .then((user)=>{
    res.status(200).json(user)
  })
  .catch((err)=>{
    res.status(500).json({error: err.message})
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const {id} = req.params; 
  data.getUserPosts(id)
  .then((posts)=>{
    res.status(200).json(posts)
  })
  .catch(err=>{
    res.status(500).json({error: err.message})
  })
});

router.delete('/:id',validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;
  data.remove(id)
  .then(deleted =>{
    res.status(200).json(deleted)
  })
  .catch(err=>{
    res.status(500).json({error: err.message})
  })

});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
const {id} = req.params;
const {name} = req.body;

data.update(id, {name})
.then(update=>{
if(update){
  data.getById(id)
  .then (post => res.status(200).json(post))
  .catch(err=>res.status(500).json({error: err.message}))
}
})
.catch(err=>{
  res.status(500).json({error: err.message})
})
});

//custom middleware

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


function validateUser(req, res, next) {
  // do your magic!
  !req.body.name ? res.status(400).json({message: "make sure to provied name"}) : next()
}



module.exports = router;
