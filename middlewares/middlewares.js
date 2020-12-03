const Users = require('../users/userDb')
const Posts = require('../posts/postDb')

// const logger = (req,res, next) => {
//     let current_datetime = new Date();
//     let formatted_date =
//         current_datetime.getFullYear() + "-" +
//         current_datetime.getMonth() + "-" +
//         current_datetime.getHours() + ":" +
//         current_datetime.getMinutes() + ":" +
//         current_datetime.getSeconds();
//     let method = req.method;
//     let url = req.url;
//     let status = req.statusCode;
//     let log = `[${formatted_date}]
//     ${method}:${url} ${status}`;
//     console.log(log);
//     next();
// }

const validateUserId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await Users.findById(id);
        if (!user) {
            res.status(404).json({ message: `User with id ${id} not found` });
        } else {
            req.user = user;
            next();
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the user' })
    }
};

const validateUser = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: 'missing user data'})
    } else if
        (!req.body.name) {
            res.status(400).json({ message: 'missing required name field' })
        } else {
            next();
        }
}


const validatePost = (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: 'missing post data'})
    } else if
        (!req.body.text) {
            res.status(400).json({ message: 'missing required text field' })
        } else {
            next();
        }
}

const validatePostId = async (req, res, next) => {
    const { id } = req.params;
    try {
      const post = await Posts.findById(id);
      if (!post) {
        res.status(404).json({ message: `Post with id ${id} not found`});
      } else {
        req.post = post;
        next();
      }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the post' })
      }
    }



module.exports = {
    // logger,
    validateUserId,
    validateUser,
    validatePost,
    validatePostId
}
