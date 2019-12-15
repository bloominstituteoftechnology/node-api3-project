const express = require('express');

const router = express.Router();

const db = require('./userDb.js')



router.post('/', validateUser, (req, res) => {
  
  // const { name } = req.body

  //   if (!name ){
  //       return res.status(400).json({"error": "Please provide a name for the user"})
  //     }
    

    db.insert(req.body)
      .then(response => {
        res.status(201).json(response)
      })
      .catch(err => {
        res.status(500).json({message: "There was an error while saving the user to the database"})
      })
  
  
});


router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  
  // const { text } = req.body

  // if (!text ){
  //   return res.status(400).json({"error": "Please provide text for the post"})
  // }

  
  db.insert(req.body)
    .then(response => {
      res.status(201).json(response)
    })
    .catch(err => {
      res.status(500).json({message: "There was an error while saving the user to the database"})
    })


});



router.get('/', (req, res) => {
  
  db.get()
      .then(response => {
        res.json(response)
      })
      .catch(err => {
        res.status(500).json({message: "The User information could not be retrieved."})
      })

});

router.get('/:id', validateUserId, (req, res) => {
  
  db.getById(req.params.id)
      .then(response => {

        if(response.length != 0){
            res.json(response)
        }else{
            res.status(404).json({message: "The user with the specified ID does not exist." })
        }
        
      })
      .catch(err => {
        res.status(500).json({error: "The User information could not be retrieved." })
      })

});

router.get('/:id/posts', (req, res) => {
  
  db.getUserPosts(req.params.id)
      .then(response => {

        if(response.length != 0){
            res.json(response)
        }else{
            res.status(404).json({message: "The post with the specified ID does not exist." })
        }

      })
      .catch(err => {
        res.status(500).json({error: "The comments information could not be retrieved."})
      })

});

router.delete('/:id', (req, res) => {
  
  const id = req.params.id

    db.getById(id)
        .then(response => {

            if(response.length != 0){

                db.remove(id)
                .then(response => {
                    res.status(201).json(response)
                })
                .catch(err => {
                    res.status(500).json({error: "The user could not be removed." })
                })
            }else{
                res.status(404).json({message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({error: "The user could not be removed." })
        })

});

router.put('/:id', (req, res) => {
  
  const user_id = req.params.id

    const { name }  = req.body

    
    if (!name ){
        return res.status(400).json({ errorMessage: "Please provide a name for the user." })
      }

    
    db.getById(user_id)
        .then(response => {

            if(response.length != 0){

                db.update(user_id, req.body)
                .then(response => {
                    res.status(200).json(response)
                })
                .catch(err => {
                    res.status(500).json({error: "The user information could not be modified." })
                })
            }else{
                res.status(404).json({message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({err })
        })

});

//custom middleware

function validateUserId(req, res, next) {

  try{
    const user = db.getById(req.params.id)

    if(user){

        req.user = user

        next()

        }else{
            res.status(400).json({
              message: "invalid user id"
            })
        }

    } catch( err) {
      next(err)
    }
}


function validateUser(req, res, next) {
  
  if(!req.body){
    
    return res.status(400).json({ message: "missing user data" })

  }else if(!req.body.name){

    return res.status(400).json({ message: "missing required name field" })

  }

  next()

}

function validatePost(req, res, next) {
  
  if(!req.body.text){

    return res.status(400).json({ message: "missing required text field" })

  }else{
    
    next()

  }



}

module.exports = router;
