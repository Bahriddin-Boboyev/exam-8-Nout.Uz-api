const Joi = require("joi");

exports.addAdminSchema = Joi.object({
  name: Joi.string().required().min(5).max(10),
  email: Joi.string().required().min(5).max(30),
  password: Joi.string().required().min(5),
});
