const express = require("express");
const {
    getAllAccounts,
    getAccount,
    updateAccount,
    deleteAccount,
    register,
} = require("../controllers/accountController");
const router = express.Router();

const initAPIRoutes = (app) => {
    // router.get("/account/info/:id", getAccount);
    router.get("/account/findone", getAccount);
    router.post("/register", register);
    router.get("/account/all", getAllAccounts);
    router.put("/account/change-password", updateAccount);
    router.delete("/account/:id", deleteAccount);

    return app.use("/api/", router);
};

module.exports = initAPIRoutes; // export default
