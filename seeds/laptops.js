/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('laptops').del()
  await knex('laptops').insert([
    {brand_id: 26, model_id: 1 , name :'HP Valion 530RTX' , image :'src/uploads.shhss.jpeg' , screen : '16dyum' ,processor :'core i9' , description :'Zor noutbook' , ram :' 12gb' , price :7000000},
    {brand_id: 26, model_id: 2 , name :'Omen  530RTX' , image :'src/uploads.shhss.jpeg' , screen : '16dyum' ,processor :'core i7' , description :'Zor noutbook' , ram :' 16gb' , price :7000000},
    {brand_id: 27, model_id: 3 , name :'DELL best of best' , image :'src/uploads.shhss.jpeg' , screen : '16dyum' ,processor :'core i9' , description :'Zor noutbook' , ram :' 12gb' , price :12000000}
 
  ]);
};
