const Joi = require("joi");

exports.updateBrandSchema = Joi.object({
  name: Joi.string().max(70).min(1),
});
