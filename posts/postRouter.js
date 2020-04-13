const express = require('express');
const db = require('./postDb');

const router = express.Router();

router.use("/:id", validatePostId);

router.get('/', (req, res) => {
    db.get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(500).json({
                err,
                errorMessage: "Can't retrieve posts."
            });
        });
});

router.get('/:id', (req, res) => {
    db.getById(req.params.id)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => {
            res.status(404).json({
                err,
                errorMessage: "Can't retrieve post."
            });
        });
});

router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(count => {
            count === 1
                ? res.status(200).json({
                      message: `${count} post was removed from database.`
                  })
                : res.status(500).json({
                      err,
                      errorMessage: "Can't remove post."
                });
        })
        .catch(err => {
            res.status(500).json({
                err,
                errorMessage: "Can't remove post."
            });
        });
});

router.put('/:id', (req, res) => {
    db.update(req.params.id, req.body)
        .then(count => {
            count === 1
                ? res.status(200).json({
                      message: `${count} post was updated in database.`
                  })
                : res.status(500).json({
                      err,
                      errorMessage: "Can't update post."
                  });
        })
        .catch(err => {
            res.status(500).json({
                err,
                errorMessage: "Can't update post."
            });
        });
});

// custom middleware

function validatePostId(req, res, next) {
    db.getById(req.params.id)
        .then(post => {
            post
                ? next()
                : res.status(400).json({
                    message: "Invalid post id." 
                });
        })
        .catch(err => {
            res.status(500).json({
                err,
                message: "Error connecting to database."
            });
        });
}

module.exports = router;
