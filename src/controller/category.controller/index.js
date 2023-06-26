const db = require("../../db/index");
const uuid = require('uuid')
exports.postCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const dbQ = db("category").insert({ name }).returning("*");
    const category = await dbQ;
    console.log(category);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const dbQ = db.table("category");
    const category = await dbQ;
    console.log(category);
    res.status(201).json({ message: "Categoriyalar", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    const existing = await db('category').where({ id }).first()

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idle category topilmadi`
      })
    }

    const deleted = await db('category').where({ id }).delete().returning('*')
    res.status(200).json({
        deleted: deleted[0]
      })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// !brands
exports.getModels = async (req, res) => {
  try {
    const {q} = req.query
    const dbQ = db("brands")
      .innerJoin("models", "models.brand_id", "=", "brands.id")
      .select("models.id", "brands.name as brandName", "models.name as name");

      if (q) {
        dbQ.andWhereILike('models.name', `%${q}%`)
      }
    const models = await dbQ;
    console.log(models);
    res.status(201).json({ message: "Modellar", models });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.postModels = async (req, res) => {
  try {
    const {name , brand_id } = req.body
   
    const dbQ = db('models').insert({
        name,
        brand_id
      }).returning('*')
    const models = await dbQ;
    console.log(models);
    res.status(201).json({ message: "Model qo'shildi", models });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// !getBrands
exports.getBrands = async (req, res) => {
  try {
    const {q} = req.query
    const dbQ = db.table("brands");
    if (q) {
        dbQ.andWhereILike('brands.name', `%${q}%`)
      }
    const brands = await dbQ;
    console.log(brands);
    res.status(201).json({ message: "Brandlar", brands });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.postBrands = async (req, res) => {
  try {
    const {name }=  req.body
    const img = req.files?.img
    const imgname = img && `${uuid.v4()}.${img?.mimetype.split('/')[1]}`
    img?.mv(`${process.cwd()}/uploads/${imgname}`)
    const dbQ = db("brands").insert({ name ,img :imgname }).returning("*");
    const brand = await dbQ;
    console.log(brand);
    res.status(201).json({ message: "Success" , brand });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
