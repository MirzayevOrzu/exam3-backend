const Joi = require('joi');

exports.postLaptopsSchema = Joi.object({
  name: Joi.string().required(),
  brand_id : Joi.number().required(),
  model_id : Joi.number().required(),
  screen : Joi.string().required(),
  processor : Joi.string().required(),
  description : Joi.string(),
  ram : Joi.string().required(),
  video_card : Joi.string(),
  price : Joi.number().required(),
});