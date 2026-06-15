const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("../db/prisma");
const AppError = require("../utils/AppError");

const SECRET = process.env.JWT_SECRET;

const loginUser = async (username, password) => {

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role
    },
    SECRET,
    {
      expiresIn: "1h"
    }
  );

  return token;
};

module.exports = {
  loginUser
};