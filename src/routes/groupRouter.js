const express = require("express");
const { getAllGroups, createGroup, getGroup, updateGroup, deleteGroup } = require("../controllers/groupController");
const router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/group/info/:id", getGroup);

    router.post("/group", createGroup);
    router.get("/group/all", getAllGroups);
    router.put("/group/change-password", updateGroup);
    router.delete("/group/:id", deleteGroup);

    return app.use("/api/", router);
};

module.exports = initAPIRoutes; // export default
