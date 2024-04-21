const express = require("express");
const { getAllRoles, createRole, getRole, updateRole, deleteRole } = require("../controllers/roleController");
const router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/role/info/:id", getRole);

    router.post("/role", createRole);
    router.get("/role/all", getAllRoles);
    router.put("/role/change-password", updateRole);
    router.delete("/Role/:id", deleteRole);

    return app.use("/api/", router);
};

module.exports = initAPIRoutes; // export default
