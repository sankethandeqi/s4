const express = require("express");
const router = express.Router();
require("express-async-errors");
const AuthController = require("../controllers/auth.controller");

router.post("/verify-token", AuthController.verifyToken);

module.exports = router;