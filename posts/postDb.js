const db = require('../data/dbConfig.js');

//----------helper functions---------

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

// .get()-- to get all the posts
function get() {
  return db('posts');
}

//getById()-- to get post by id
function getById(id) {
  return db('posts')
    .where({ id })
    .first();
}

// insert()-- adds a new post
function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

//update()-- updates the specific post
function update(id, changes) {
  return db('posts')
    .where({ id })
    .update(changes);
}

//remove()-- deletes the post with a given id
function remove(id) {
  return db('posts')
    .where('id', id)
    .del();
}
