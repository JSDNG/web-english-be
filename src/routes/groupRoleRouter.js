const express = require("express");
const {
    getAllGroupRoles,
    createGroupRole,
    getGroupRole,
    updateGroupRole,
    deleteGroupRole,
} = require("../controllers/groupRoleController");
const router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/grouprole/info/:id", getGroupRole);

    router.post("/grouprole", createGroupRole);
    router.get("/grouprole/all", getAllGroupRoles);
    router.put("/grouprole/change-password", updateGroupRole);
    router.delete("/grouprole/:id", deleteGroupRole);

    return app.use("/api/", router);
};

module.exports = initAPIRoutes; // export default
