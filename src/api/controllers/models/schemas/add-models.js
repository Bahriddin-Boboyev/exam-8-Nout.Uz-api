const Joi = require("joi");

exports.addModelSchema = Joi.object({
  name: Joi.string().required().max(70).min(1),
  brand_id: Joi.number().integer().required(),
});
