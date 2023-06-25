/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('laptops' , (table)=>{
        table.increments('id').primary() ;
        table.integer('brand_id').references('brands.id').onDelete('SET NULL').notNullable() ;    
        table.integer('model_id').references('models.id').onDelete('SET NULL').notNullable() ;    
        table.string('name') ;    
        table.string('image').notNullable() ; 
        table.string('screen').notNullable() ;
        table.string('processor').notNullable() ;
        table.string('description' , 560 ) ;
        table.string('ram').notNullable() ;
        table.string('video_card');
        table.bigInteger('price').notNullable() ;
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
