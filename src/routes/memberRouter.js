const express = require("express");
const {
    getAllMembers,
    getMember,
    updateMember,
    deleteMember,
    createMember,
} = require("../controllers/memberController");
const router = express.Router();

const initAPIRoutes = (app) => {
    router.post("/member", createMember);
    router.put("/member", updateMember);
    return app.use("/api/", router);
};

module.exports = initAPIRoutes; // export default
