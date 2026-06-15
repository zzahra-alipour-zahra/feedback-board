const express = require("express");
const { login } = require("./../controllers/authController");
const validateRequest = require("./../middleware/validateRequest");
const { loginSchema } =require("./../validations/authValidation");
const router = express.Router();


router.post("/login",
             validateRequest(loginSchema),
             login);

module.exports = router;