const Joi = require("joi");

exports.loginUsersScheme = Joi.object({
  mail: Joi.string().min(3).required().email(),
  password: Joi.string().min(3).required()
});
