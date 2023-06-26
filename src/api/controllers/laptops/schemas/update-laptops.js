const Joi = require("joi");

exports.updateLaptopsSchema = Joi.object({
  name: Joi.string().min(1).max(100),
  description: Joi.string().min(10),
  price: Joi.number().integer(),
  brand_id: Joi.number().integer(),
  model_id: Joi.number().integer(),
  category_id: Joi.number().integer(),
});
