const express = require("express");
const { getHomePage, getInfo, postCreateAccount } = require("../controllers/homeController");
const router = express.Router();

// router.method("/route", handler);
router.get("/", getHomePage);

router.get("/info", getInfo);
router.post("/create-account", postCreateAccount);
module.exports = router; // export default
