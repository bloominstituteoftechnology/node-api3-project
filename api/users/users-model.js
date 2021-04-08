const db = require('../../data/db-config');

module.exports = {
  get,
  getById,
  getUserPosts,
  checkNameUnique,
  insert,
  update,
  remove,
};

function get() {
  return db('users');
}

function getById(id) {
  return db('users')
    .where({ id })
    .first();
}

function getUserPosts(userId) {
  return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.text', 'u.name as postedBy')
    .where('p.user_id', userId);
}

function checkNameUnique(name){
  return db('users as u')
    .select('u.name')
    .where('u.name', name)
}

function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      console.log(ids)
      return getById(ids[0]);
    });
}

// changed this to return the updated object
function update(id, changes) {
  return db('users')
    .where({ id })
    // .returning('name') not supported by sqlite3
    .update(changes)
    .then( () => {
      return getById(id)
    })
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}
