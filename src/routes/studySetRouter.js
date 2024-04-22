const express = require("express");
const {
    getAllStudySets,
    createStudySet,
    getStudySet,
    updateStudySet,
    deleteStudySet,
} = require("../controllers/studySetController");
const router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/studyset/info/:id", getStudySet);

    router.post("/studyset", createStudySet);
    router.get("/studyset/all", getAllStudySets);
    router.put("/studyset/change-password", updateStudySet);
    router.delete("/studyset/:id", deleteStudySet);

    return app.use("/api/", router);
};

module.exports = initAPIRoutes; // export default
