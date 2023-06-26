const Joi = require("joi");

exports.updateModelSchema = Joi.object({
  name: Joi.string().max(70).min(1),
  brand_id: Joi.number().integer(),
});
