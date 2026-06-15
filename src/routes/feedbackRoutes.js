const express = require("express");
const {
  createFeedback,
  getAllFeedbacks,
  updateFeedbackStatus,
} = require("../controllers/feedbackController");
const {authMiddleware,adminOnly} = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");

const {
  createFeedbackSchema,
  updateFeedbackSchema
} = require("../validations/feedbackValidation");
const { feedbackQuerySchema } =
require("../validations/feedbackQueryValidation");

const router = express.Router();

router.post("/",validateRequest(createFeedbackSchema), createFeedback);

router.get("/admin/feedbacks",
            authMiddleware,
            adminOnly,
            validateRequest(feedbackQuerySchema,"query"),
            getAllFeedbacks);

router.patch("/admin/feedbacks/:id",
              authMiddleware,
              adminOnly,
              validateRequest(updateFeedbackSchema),
              updateFeedbackStatus);

module.exports = router;