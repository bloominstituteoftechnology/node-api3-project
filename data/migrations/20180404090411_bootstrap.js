exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (users) {
            users.increments();
            users
                .string('name')
                .notNullable()
                .unique();
        })
        .createTable('posts', function (posts) {
            posts.increments();
            posts.text('text').notNullable();

            posts
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable("pokemon", function (pokemon) {
            pokemon.increments();
            pokemon.string("name").notNullable().unique();

            pokemon.integer("pokemon_number").notNullable().unique();
        });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('posts').dropTableIfExists('users').dropTableIfExists("pokemon");
};
