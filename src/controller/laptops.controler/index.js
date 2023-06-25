const db = require("../../db/index");
const uuid = require('uuid')

exports.postLaptop = async (req, res) => {
  try {
    const {name , brand_id , model_id , screen , processor , description, ram ,video_card , price }  = req.body
    
    const img = req.files?.img;
    const imgname = img && `${uuid.v4()}.${img?.mimetype.split("/")[1]}`;
    img?.mv(`${process.cwd()}/uploads/${imgname}`);
    const dbQ = db("laptops").insert({name , brand_id , model_id , screen , processor , description , ram , video_card , price , image :imgname})
    const directions = await dbQ;
    console.log(directions);
    res.status(201).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLaptop = async (req, res) => {
  try {
    const dbQ = db("laptops")
      .leftJoin("models", "models.id", "=", "laptops.model_id")
      .leftJoin("brands", "laptops.brand_id", "=", "brands.id")
      .select(
        "laptops.name",
        "models.name as modelName",
        "brands.name as brandsName",
        'image' , 'screen' ,'processor' , 'description' ,'ram' , 'video_card' , 'price'
      );
    const laptops = await dbQ;

    res.status(201).json({ message: "Laptops", laptops: laptops });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
