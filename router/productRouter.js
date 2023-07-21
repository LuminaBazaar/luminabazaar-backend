const router = require("express").Router();
const productController = require("../controller/productController");
const authorize = require("../middleware/authorize");
const admin = require("../middleware/admin");

router.route("/filter").post(productController.getFilterProduct);

router
    .route("/")
    .get(productController.getProduct)
    .post([authorize, admin], productController.createProduct);
router.route("/getPhoto/:id").get(productController.getPhotoById);
router
    .route("/:id")
    .get(productController.getProductById)
    .put([authorize, admin], productController.updateProduct)
    .delete([authorize, admin], productController.deleteProduct);

module.exports = router;
