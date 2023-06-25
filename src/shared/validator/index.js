const Joi = require('joi');

/**
 *
 * @param {Joi.Schema} schema
 * @returns
 */
module.exports = function genValidator(schema) {
    return (req, res, next) => {
      const result = schema.validate(req.body);
       console.log('slaom');
      if (result.error) {
     return   res.send({message: result.error.details[0].message});
  
      }
  
      next();
    };
};
