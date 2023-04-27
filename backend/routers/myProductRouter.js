const express = require("express");
const { myProductController } = require("../controllers/index");
const router = express.Router();

router.get("/:store_name", myProductController.fetchProductByStoreName);
router.post("/", myProductController.postProduct);

module.exports = router;
