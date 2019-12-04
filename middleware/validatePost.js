import { METHODS } from "http"

function validatePost(req, res, next) {
   if (!req.body) {
       res.status(400).json({ message: "missing post data" })
   }else{
       if (!req.body.text){
           res.status(400).json({ message: "missing required text field" })
       }else{
           if (!req.body.user_id){
               res.status(400).js({ message: "missing required user id field" })
           }else{
               next()
           }
       }
   }
}


module.export = validatePost