const express = require("express");
const { getAllClasss, getClass, updateClass, deleteClass, createClass } = require("../controllers/classController");
const router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/class/info/:id", getClass);
    router.get("/class/all", getAllClasss);
    router.get("/class/findone", getClass);
    router.post("/class", createClass);

    router.put("/class/change-password", updateClass);
    router.delete("/class/:id", deleteClass);

    return app.use("/api/", router);
};

module.exports = initAPIRoutes; // export default
