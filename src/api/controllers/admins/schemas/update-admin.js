const Joi = require("joi");

exports.updateAdminSchema = Joi.object({
  name: Joi.string().min(5).max(10),
  email: Joi.string().min(5).max(30),
  password: Joi.string().min(5),
});
