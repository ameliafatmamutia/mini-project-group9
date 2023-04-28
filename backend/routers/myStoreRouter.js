const express = require("express");
const router = express.Router();
const { myStoreController } = require("../controllers/index");

router.get("/:username", myStoreController.checkStoreName);
router.patch("/update/:username", myStoreController.registerStoreName);

module.exports = router;
