const Joi = require("joi");

exports.createFeedbackSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),

  message: Joi.string()
    .trim()
    .min(5)
    .max(1000)
    .required()
});


exports.updateFeedbackSchema = Joi.object({
  status: Joi.string()
    .valid("SUBMITTED", "IN_REVIEW", "RESOLVED")
    .required()
});