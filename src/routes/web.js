const express = require("express");
const { getHomePage, getInfo } = require("../controllers/homeController");
const router = express.Router();

// router.method("/route", handler);
router.get("/", getHomePage);

router.get("/info", getInfo);
module.exports = router; // export default
