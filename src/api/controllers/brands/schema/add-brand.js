const Joi = require("joi");

exports.addBrandSchema = Joi.object({
  name: Joi.string().required().max(70).min(1),
});
