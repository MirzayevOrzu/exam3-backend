const db = require('../../db/index')

exports.postCategory = async (req, res) =>{
    try {
        const {name } = req.body
          const dbQ = db('category').insert({name}).returning('*')
          const category = await dbQ;
        console.log(category);
        res.status(201).json({message :"Success"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }}
exports.getCategory = async (req, res) =>{
    try {
          const dbQ = db.table('category' )
//   .leftJoin(
//     'category', 
//     'category.id', 
//     '=', 
//     'categories_brands.category_id'
// //   )
//   .leftJoin(
//     'brands', 
//     'brands.id', 
//     '=', 
//     'categories_brands.brands_id'
//   )
          const category = await dbQ;
        console.log(category);
        res.status(201).json({message :"Categoriyalar" , category})
    } catch (error) {
        res.status(500).json({message: error.message})
    }}

    // !brands
exports.getModels = async (req, res) =>{
    try {
          const dbQ = db('brands' ).innerJoin('models', 'models.brand_id' , "=" , 'brands.id').select('models.id' , 'brands.name as brandName' , 'models.name as name'  )
          const models = await dbQ;
        console.log(models);
        res.status(201).json({message :"Modellar" , models})
    } catch (error) {
        res.status(500).json({message: error.message})
    }}
    // !getModels
    exports.getBrands = async (req, res) =>{
        try {
              const dbQ = db.table('brands' )
              const brands = await dbQ;
            console.log(brands);
            res.status(201).json({message :"Brandlar" , brands})
        } catch (error) {
            res.status(500).json({message: error.message})
        }}
