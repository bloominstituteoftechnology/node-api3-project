const Users =require('../users/users-model.js')

const logger = (info) => (req,res,next) =>{
  console.log(
    ` METHOD: ${req.method} URL: ${req.url} TIMESTAMP: ${Date.now()}`
  );
  next();
}


const validateUserId= async (req, res, next) =>{
  const {id} = req.params
  try {
    const user = await Users.findById(id)
    if(!user){
      res.status(400).json({message: ` No user with id :${id}`})
    }else{
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json(`Server error: ${err}`)
  }
}


const validateUser = async (req,res,next) =>{
  const {id} = req.params
  try {
    const user = await Users.getById(id);
    if (!user) {
      res.status(400).json({ message: `ID ${id} found.` });
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({ message: `${e}` });
  }
}


const validatePost = (req,res,next) =>{
  const {name,text,postedBy}= req.body
  if(!text || !name || !postedBy){
    res.status(400).json(`Name required`)
  }else{
    next()
  }
}
module.exports={
  logger,
  validateUserId,
  validateUser,
  validatePost
}
// do not forget to expose these functions to other modules
