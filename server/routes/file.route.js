const express = require("express");
const router = express.Router();
require("express-async-errors");
const FileController = require("../controllers/file.controller");

router.post("/", FileController.upload);
router.get("/", FileController.getAll);

module.exports = router;