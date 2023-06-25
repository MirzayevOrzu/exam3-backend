const Joi = require('joi');

exports.postCategorySchema = Joi.object({
  name: Joi.string().required()
});