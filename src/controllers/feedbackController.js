const prisma = require("../db/prisma");
const {
  createFeedbackSchema,
  updateFeedbackSchema
} = require("../validations/feedbackValidation");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const feedbackService = require("../services/feedbackService");

const createFeedback = asyncHandler(async (req, res) => {

  const { title, message } = req.body;

  const feedback = await feedbackService.createFeedback(
    title,
    message
  );

  res.status(201).json({
    success: true,
    data: feedback
  });

});

const getAllFeedbacks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status;
  const search = req.query.search || "";

  const feedbacks = await feedbackService.getAllFeedbacks(
    page,
    limit,
    status,
    search
  );

  res.status(200).json({
    success: true,
    data: feedbacks
  });

});

const updateFeedbackStatus = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const { status } = req.body;
  console.log(req.headers.authorization);

  const updatedFeedback =
    await feedbackService.updateFeedbackStatus(id, status);

    console.log("STATUS CODE:", res.status);

  res.status(200).json({
    success: true,
    data: updatedFeedback
  });

});

module.exports = {
    createFeedback,
    getAllFeedbacks,
    updateFeedbackStatus,
};


