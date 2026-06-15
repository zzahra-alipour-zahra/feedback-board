const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/authService");

const login = asyncHandler(async (req, res) => {

  const { username, password } = req.body;

  const token = await authService.loginUser(
    username,
    password
  );

  res.status(200).json({
    success: true,
    token
  });

});

module.exports = {
  login
};