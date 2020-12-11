const db = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
  addUserPost,
  findUserPostById
};
function findUserPostById(userId, id) {
	return db("posts")
		.where({ id, user_id: userId })
		.first()
}

async function addUserPost(userId, post) {
	const data = { user_id: userId, ...post }
	const [id] = await db("posts").insert(data)

	return findUserPostById(userId, id)
}

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

function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => {
      return getById(ids[0]);
    });
}

function update(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('users')
    .where('id', id)
    .del();
}
