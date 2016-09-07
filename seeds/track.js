exports.seed = function(knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('track').del(),

        // Inserts seed entries
        knex('track').insert({id: 1, name: 'Strawberry Fields'}),
        knex('track').insert({id: 2, name: 'Soft Bulletin'})
    );
};
