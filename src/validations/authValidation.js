const Joi = require("joi");

exports.loginSchema = Joi.object({
  username: Joi.string()
    .trim()
    .required(),

  password: Joi.string()
    .required()
});