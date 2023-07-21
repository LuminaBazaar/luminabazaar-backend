const express = require("express");
const Router = express.Router();
const profileController = require("../controller/profileController");
const authorize = require("../middleware/authorize");

Router.route("/getprofile").get(authorize, profileController.getProfile);
Router.route("/setprofile").post(authorize, profileController.setProfile);

module.exports = Router;
