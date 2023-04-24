const express = require("express");
const { productController } = require("../controllers/index");
const router = express.Router();

// router.post("/", productController.postProduct);
router.get("/", productController.getProduct);
// router.get("/:id", productController.getProductById);
// router.put("/:id", productController.updateProductById);
// router.put("/status/:id", productController.activateDeactivateProduct);
// router.delete("/:id", productController.deleteProductById);

module.exports = router;
