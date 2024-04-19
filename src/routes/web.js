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
const initWebRoutes = (app) => {
    router.get("/", getHomePage);

    router.get("/info", getInfo);
    router.get("/account-info/:id", getAccount);
    router.post("/create-account", postCreateAccount);
    router.post("/update-account", postUpdateAccount);
    router.post("/delete-account", postDeleteAccount);

    return app.use("/", router);
};

module.exports = initWebRoutes; // export default
