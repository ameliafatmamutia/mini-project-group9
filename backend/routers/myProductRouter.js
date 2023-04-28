const express = require("express");
const { myProductController } = require("../controllers/index");
const router = express.Router();

router.get("/:store_name", myProductController.fetchProductByStoreName);
router.post("/", myProductController.postProduct);
router.patch("/update/:editId", myProductController.updateProductById);
router.patch("/deactivate/:Id_Product", myProductController.deactivateProduct);
router.patch("/activate/:Id_Product", myProductController.activateProduct);
router.delete("/delete/:Id_Product", myProductController.deleteProduct);

module.exports = router;
