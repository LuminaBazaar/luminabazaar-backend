const router = require("express").Router();
const categoryController = require("../controller/categoryController");
const authorize = require("../middleware/authorize");
const admin = require("../middleware/admin");

router
    .route("/")
    .get(categoryController.getCategory)
    .post([authorize, admin], categoryController.createCategory);
router
    .route("/:id")
    .delete([authorize, admin], categoryController.deleteCategory);

module.exports = router;
