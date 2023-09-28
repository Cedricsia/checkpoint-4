const express = require("express");

const router = express.Router();

const authControllers = require("../controllers/authController");
const hashPassword = require("../middlewares/hashPassword");
const CheckUserExists = require("../middlewares/checkUserExists");
const CheckUserDoesntExist = require("../middlewares/checkUserDoesntExist");

router.post("/sign-in", CheckUserExists, authControllers.signIn);
router.post(
  "/sign-up",
  CheckUserDoesntExist,
  hashPassword,
  authControllers.signUp
);

module.exports = router;
