const Joi = require("joi");

exports.feedbackQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .default(10),

  status: Joi.string()
    .valid(
      "SUBMITTED",
      "IN_REVIEW",
      "RESOLVED"
    )
});