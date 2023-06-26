const Joi = require("joi");

exports.addLaptopsSchema = Joi.object({
  name: Joi.string().required().min(1).max(100),
  description: Joi.string().required().min(10),
  price: Joi.number().integer().required(),
  brand_id: Joi.number().integer().required(),
  model_id: Joi.number().integer().required(),
  category_id: Joi.number().integer().required(),
});
