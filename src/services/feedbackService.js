const prisma = require("../db/prisma");
const AppError = require("../utils/AppError");

const createFeedback = async (title, message) => {

    return await prisma.feedback.create({
      data: {
        title,
        message
      }
    });
  
};


const getAllFeedbacks = async (page, limit, status,search) => {

    const skip = (page - 1) * limit;
  
    const where = {};
  
    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          message: {
            contains: search,
            mode: "insensitive"
          }
        }
      ];
    }
  
    const feedbacks = await prisma.feedback.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc"
      }
    });
  
    const total = await prisma.feedback.count({
      where
    });
  
    return {
      page,
      limit,
      total,
      feedbacks
    };
  };


const updateFeedbackStatus = async (id, status) => {

    const feedback = await prisma.feedback.findUnique({
      where: {
        id
      }
    });
  
    if (!feedback) {
      throw new AppError("Feedback not found", 404);
    }
  
    return await prisma.feedback.update({
      where: {
        id
      },
      data: {
        status
      }
    });
  
};


module.exports = {
    createFeedback,
    getAllFeedbacks,
    updateFeedbackStatus
};