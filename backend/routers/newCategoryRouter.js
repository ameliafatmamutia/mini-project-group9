const express = require("express");
const { newCategoryController } = require("../controllers/index")
const router = express.Router();

router.post("/", newCategoryController.newCategory)

module.exports = router;