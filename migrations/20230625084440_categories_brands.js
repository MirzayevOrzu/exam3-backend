/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categories_brands' , (table)=>{
        table.increments('id' ),
        table.integer('category_id').references('id').inTable('category').onDelete('SET NULL');
        table.integer('brand_id').references('id').inTable('brands').onDelete('SET NULL');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
