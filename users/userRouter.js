const express = require('express');
const userDB = require('../users/userDb');
const postDB = require('../posts/postDb')
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());


router.post('/', validateUser, (req, res) => {
  // do your magic!

    const data = req.body;

    userDB.insert(data)
        .then(user => {
            res.status(201).json({user})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Could not post user data"})
        })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
    let user;
    if (req.body) {
        user = {
            user_id: req.params.id,
            text: req.body.text
        }
    }

    postDB.insert(user)
        .then(posted => {
                    res.status(201).json(posted)
                })
        .catch(error => {
            res.status(500).json({
                errorMessage: "an error occured while making new post"
            })
        })
});

router.get('/', (req, res) => {
  // do your magic!
   userDB.get()
       .then(user => res.status(200).json(user))
       .catch(err => console.error(err))
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
    userDB.getById(req.params.id)
        .then(user => {
            res.status(201).send(user);
        })
        .catch(err => {
            res.status(500).json({ message: "No User By this ID"})
        })

});

router.get('/:id/posts', validateUserId,(req, res) => {
  // do your magic!
    userDB.getUserPosts(req.params.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => console.log(error))
});

router.delete('/:id', (req, res) => {
  // do your magic!
    userDB.remove(req.params.id)
        .then(() => res.status(201).json({message: `User has been deleted by ${req.params.id}`}))
        .catch(() => {
            res.status(500).json({ message: "No User By this ID, cannot make your request"})
        })
});

router.put('/:id', (req, res) => {
  // do your magic!
    let userUpdate;
    if (req.body)
        userUpdate = { name: req.body.name }

    userDB.update(req.params.id, userUpdate)
        .then(user => {
            return userDB.getById(req.params.id)
                .then(user => res.status(200).json(user))
        })
        .catch((err) => {
            res.status(500).json({ message: `User cannot be updated cause ${err}`})
        })

});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
    userDB.getById(req.params.id)
        .then(user => {
            if (user)
                next();
            else
                res.status(400).json({ message: "invalid user id" })
        })
        .catch(err => console.log(err))
}

function validateUser(req, res, next) {
  // do your magic!
    if (!req.body)
        res.status(400).json({ message: "missing user data"})
    else {
        if (!req.body.name) {
            res.status(400).json({message: "missing required name field"});
        } else {
            next();
        }
    }
}

function validatePost(req, res, next) {
  // do your magic!
    if (!req.body) {
        res.status(400).json({ message: "missing post data"})
    } else {
        if (!req.body.text) {
            res.status(400).json({ message: "missing required text field"})
        } else {
            next();
        }
    }
}

module.exports = router;
