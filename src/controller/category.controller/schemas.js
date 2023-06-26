const Joi = require('joi');

exports.postCategorySchema = Joi.object({
  name: Joi.string().required()
});
exports.postBrandSchema = Joi.object({
  name: Joi.string().required()
});
exports.postModelssSchema = Joi.object({
  name: Joi.string().required(),
  brand_id :Joi.number().max(100).required()

});