const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('posts');
}

function getById(id) {
  return db('posts')
    .where({ id })
    .first();
}

function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => {
      return getById(ids[0]);
    });
}

async function update(id, changes) {
  await db('posts')
    .where({ id })
    .update(changes);

  return getById(id);
}

function remove(id) {
  return db('posts')
    .where('id', id)
    .del();
}
