const Joi = require("joi");

exports.loginAdminSchema = Joi.object({
  email: Joi.string().required().min(5).max(30),
  password: Joi.string().required().min(5),
});
