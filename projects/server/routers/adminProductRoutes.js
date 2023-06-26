const express = require("express");
const { adminProductController } = require("../controllers");
const checkRole = require("../middleware/checkRole");
const upload = require("../middleware/multer");

const router = express.Router();

router.get(
  "/",
  checkRole.fetchDataforAdmins,
  adminProductController.fetchProducts
);

// Add the new route for getAllProducts
router.get(
  "/all",
  checkRole.fetchDataforAdmins,
  adminProductController.getAllProducts
);

router.post(
  "/",
  checkRole.checkAdminRole,
  upload.single("image_url"),
  adminProductController.addProduct
);
router.put(
  "/:productId",
  checkRole.checkAdminRole,
  upload.single("image_url"),
  adminProductController.editProduct
);
router.delete(
  "/:productId",
  checkRole.checkAdminRole,
  adminProductController.deleteProduct
);

module.exports = router;
