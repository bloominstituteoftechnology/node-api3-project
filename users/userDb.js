const db = require('../data/dbConfig.js');

//--------helper functions-------

module.exports = {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
};

// .get()-- to get all the users
function get() {
  return db('users');
}

//getById()-- to get user by id
function getById(id) {
  return db('users')
    .where({ id })
    .first();
}

//getUserPosts()-- to get/read the posts of a user
function getUserPosts(userId) {
  return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.text', 'u.name as postedBy')
    .where('p.user_id', userId);
}

// insert()-- adds a new user
function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return getById(ids[0]);
    });
}

//update()-- updates the userinfo
function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

//remove()-- deletes the user with given id
function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}
