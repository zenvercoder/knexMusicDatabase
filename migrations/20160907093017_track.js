exports.up = function(knex, Promise) {
    return knex.schema.createTable("track", function (table) {
        table.increments()
        table.text("name")
        table.integer('artist_id').references('id').inTable('artist')
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("track")
}
