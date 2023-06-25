// const UserModal  = require("../models/Users");
// const Token = require("../models/token");
// const sendEmail = require("../utils/sendEmail");
// const crypto = require("crypto");
// const Joi = require("joi");

const express = require("express");
const router = express.Router();

const passwordResetController = require("../controllers/passwordResetController");

//POST
router.post("/", passwordResetController.sendResetPassword);
router.post("/resetPassword/:email/:token", passwordResetController.resetPassword);


module.exports = router;
