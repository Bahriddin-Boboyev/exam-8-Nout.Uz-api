const Joi = require("joi");

exports.addCategorySchema = Joi.object({
  name: Joi.string().required().max(70).min(1),
});
