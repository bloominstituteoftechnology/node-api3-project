const db = require('../data/dbConfig.js');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
};

function get() {
    return db('pokemon');
}

function getById(pokemon_number) {
    return db('pokemon')
        .where({ pokemon_number })
        .first();
}

function insert(pokemon) {
    return db('pokemon')
        .insert(pokemon)
        .then(ids => {
            return getById(ids[0]);
        });
}

function update(pokemon_number, changes) {
    return db('pokemon')
        .where({ pokemon_number })
        .update(changes);
}

function remove(pokemon_number) {
    return db('pokemon')
        .where('pokemon_number', pokemon_number)
        .del();
}
