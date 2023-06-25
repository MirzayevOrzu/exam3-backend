/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('models' , (table)=>{
        table.increments('id' ),
        table.string('name' , 100).unique(),
        table.integer('brand_id').references('id').inTable('brands').onDelete('SET NULL');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
