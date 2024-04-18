const express = require("express");
const {
    getHomePage,
    getInfo,
    postCreateAccount,
    getAccount,
    postUpdateAccount,
    postDeleteAccount,
} = require("../controllers/homeController");
const router = express.Router();

// router.method("/route", handler);
router.get("/", getHomePage);

router.get("/info", getInfo);
router.get("/account-info/:id", getAccount);
router.post("/create-account", postCreateAccount);
router.post("/update-account", postUpdateAccount);
router.post("/delete-account", postDeleteAccount);
module.exports = router; // export default
