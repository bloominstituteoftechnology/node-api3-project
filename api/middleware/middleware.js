const postsModel=require('../posts/posts-model');
const usersModel=require('../users/users-model');

function logger(req, res, next) {
  // do your magic!
  console.log(`Request Method: ${req.method}, Request url: ${req.url},Request timestamp: ${new Date().toISOString()}`)
  next(); //so it can flow thru !
}

function validateUserId(req, res, next) {
  // do your magic!
  const id=req.params.id;
  usersModel.getById(id)
  .then(userFound=>{
    if(userFound){
      console.log('userFound by Id=',userFound)
      req.user=userFound //valid user saved to req.user
      next();
    }else{
      res.status(404).json({message: "sorry ,user not found"})
    }
  })
  .catch(err=>{ 
      res.status(500).json({message: "Oops something went wrong"})
  })
}

function validateUser(req, res, next) {
  // do your magic!
  console.log('in validateUser=',req.body)
  if(!req.body){
    res.status(400).json({ message: "missing user data"})
  }else {
    if(!req.body.name){
      res.status(400).json({message : "missing required name field"})
    }else{
      next(); //continue if the body does have name property!
    }
  }
}

function validatePostId(req, res, next) {
  // do your magic!
  const id=req.params.id;
  postsModel.getById(id)
  .then(postFound=>{
    console.log('postFound=',postFound)
    if(postFound){
      req.post=postFound; // try = {...postFound}
      next();
    }else{
      res.status(404).json({ message: "post not found" })
    }
  })
  .catch(err=>{
    res.status(500).json({message: "something went wrong!"})
  })
}

function validatePost(req, res, next) {
  // do your magic!
  //validate body 
  console.log('in validate Post',req.body)
  if(!req.body){
    res.status(400).json({message: "missing post data"})
  }else{
    if(!req.body.text){
      res.status(400).json({ message: "missing required text field"})
    }else{
      //contains text property in the body
      next();
    }
  }
}

// do not forget to expose these functions to other modules
module.exports= {logger,validateUserId,validateUser,validatePostId,validatePost};