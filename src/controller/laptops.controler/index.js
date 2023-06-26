const db = require('../../db/index')
const uuid = require('uuid')

exports.postLaptop = async (req, res) => {
  try {
    const {
      name,
      brand_id,
      model_id,
      screen,
      processor,
      description,
      ram,
      video_card,
      price
    } = req.body

    const img = req.files?.img
    const imgname = img && `${uuid.v4()}.${img?.mimetype.split('/')[1]}`
    img?.mv(`${process.cwd()}/uploads/${imgname}`)
    const dbQ = db('laptops').insert({
      name,
      brand_id,
      model_id,
      screen,
      processor,
      description,
      ram,
      video_card,
      price,
      image: imgname
    })
    const directions = await dbQ
    console.log(directions)
    res.status(201).json({ message: 'Success' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getLaptop = async (req, res) => {
  try {
    const { q, brand , sort_order='desc' ,  } = req.query
    const dbQ = db('laptops')
      .leftJoin('models', 'models.id', '=', 'laptops.model_id')
      .leftJoin('brands', 'laptops.brand_id', '=', 'brands.id')
      .select(
        'laptops.name',
        'models.name as modelName',
        'brands.name as brandsName',
        'image',
        'screen',
        'processor',
        'description',
        'ram',
        'video_card',
        'price'
      )
     
    if (q) {
      dbQ.andWhereILike('laptops.name', `%${q}%`)
    }
    if (brand) {
      dbQ.andWhereILike('brands.name', `%${brand}%`)
    }
    dbQ.orderBy('laptops.price' ,sort_order)
    const laptops = await dbQ

    res.status(201).json({ message: 'Laptops', laptops: laptops })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.deleteLaptop = async (req, res) => {
  try {
    const { id } = req.params
    const existing = await db('laptops').where({ id }).first()

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idle laptop topilmadi`
      })
    }

    const deleted = await db('laptops').where({ id }).delete().returning('*')

    res.status(200).json({
      deleted: deleted[0]
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getOneLaptop = async (req, res) => {
  try {
    const { id } = req.params
    const existing = await db('laptops')
      .leftJoin('models', 'models.id', '=', 'laptops.model_id')
      .leftJoin('brands', 'laptops.brand_id', '=', 'brands.id')
      .select(
        'laptops.id',
        'laptops.name',
        'models.name as modelName',
        'brands.name as brandsName',
        'image',
        'screen',
        'processor',
        'description',
        'ram',
        'video_card',
        'price'
      )
      .where({ 'laptops.id': id })
      .first()

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idle laptop topilmadi`
      })
    }

    console.log(existing)

    res.status(200).json({
      Finded: existing
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateLaptop = async (req, res) => {
  try {
    const { id } = req.params
    const existing = await db('laptops').where({ id }).first()
    const { ...updates } = req.body
    if (!existing) {
      return res.status(404).json({
        error: `${id}-idle laptop topilmadi`
      })
    }

    const updated = await db('laptops')
      .where({ id })
      .update({ ...updates })
      .returning('*')

    res.status(200).json({
      updated: updated[0]
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
