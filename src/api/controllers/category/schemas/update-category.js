const Joi = require("joi");

exports.updateCategorySchema = Joi.object({
  name: Joi.string().required().max(70).min(1),
});
