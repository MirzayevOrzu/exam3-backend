/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('notebooks' , (table)=>{
        table.increments('id').primary() ;
        table.string('name').notNullable() ;    
        table.string('image').notNullable() ; 
        table.string('screen').notNullable() ;
        table.string('processor').notNullable() ;
        table.string('ram').notNullable() ;
        table.string('videocard');
        table.numeric('price').notNullable() ;
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
