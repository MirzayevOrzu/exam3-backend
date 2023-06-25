const Joi = require("joi");

exports.postUsersScheme = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  mail: Joi.string().min(3).required().email(),
  password: Joi.string().min(3).required(),
  role: Joi.valid("admin", "user"),
});
