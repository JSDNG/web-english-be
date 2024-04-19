const express = require("express");
const {
    getAllAccounts,
    getInfo,
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount,
} = require("../controllers/apiController");
const router = express.Router();

const initAPIRoutes = (app) => {
    // router.get("/", getHomePage);
    router.get("/account-info/:id", getAccount);
    router.get("/info", getInfo);

    router.post("/create-account", createAccount);
    router.get("/all", getAllAccounts);
    router.put("/update-account", updateAccount);
    router.delete("/delete-account", deleteAccount);

    return app.use("/api/", router);
};

module.exports = initAPIRoutes; // export default
