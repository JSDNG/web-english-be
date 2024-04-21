const express = require("express");
const {
    getAllAccounts,
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount,
} = require("../controllers/accountController");
const router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/account/info/:id", getAccount);

    router.post("/account", createAccount);
    router.get("/account/all", getAllAccounts);
    router.put("/account/change-password", updateAccount);
    router.delete("/account/:id", deleteAccount);

    return app.use("/api/", router);
};

module.exports = initAPIRoutes; // export default
