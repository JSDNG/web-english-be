const express = require("express");
const { getAllUsers, getUser, updateUser, deleteUser, createUser } = require("../controllers/userController");
const router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/user/info/:id", getUser);
    router.post("/user", createUser);
    router.get("/user/all", getAllUsers);
    router.put("/user/change-password", updateUser);
    router.delete("/user/:id", deleteUser);

    return app.use("/api/", router);
};

module.exports = initAPIRoutes; // export default
