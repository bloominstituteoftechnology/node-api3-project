const posts = require('../users/userDb');

module.exports = () => {
  return (req, res, next) => {
    posts
      .getById(req.params.id)
      .then(post => {
        if (post) {
          req.post = post;
          next();
        } else {
          res.status(404).json({
            message: 'post not found.',
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'Error updating the post',
        });
      });
  };
};
