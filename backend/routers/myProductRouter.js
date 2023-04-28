const express = require("express");
const { myProductController } = require("../controllers/index");
const router = express.Router();

router.get("/:store_name", myProductController.fetchProductByStoreName);
router.post("/", myProductController.postProduct);
router.patch("/update/:editId", myProductController.updateProductById);

module.exports = router;
