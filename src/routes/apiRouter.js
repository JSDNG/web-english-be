const express = require("express");
const {
    getAllAccounts,
    getAccount,
    updateAccount,
    deleteAccount,
    register,
    login,
} = require("../controllers/accountController");
const router = express.Router();
const { getAllCards, createCard, getCard, updateCard, deleteCard } = require("../controllers/cardController");
const { getAllClasss, getClass, updateClass, deleteClass, createClass } = require("../controllers/classController");

const {
    getAllGroupRoles,
    createGroupRole,
    getGroupRole,
    updateGroupRole,
    deleteGroupRole,
} = require("../controllers/groupRoleController");
const { getAllGroups, createGroup, getGroup, updateGroup, deleteGroup } = require("../controllers/groupController");
const { updateMember, createMember } = require("../controllers/memberController");
const { getAllRoles, createRole, getRole, updateRole, deleteRole } = require("../controllers/roleController");
const {
    getAllStudySets,
    createStudySet,
    getStudySet,
    updateStudySet,
    deleteStudySet,
} = require("../controllers/studySetController");
const { getUser, updateUser, getUsers } = require("../controllers/userController");

const initAPIRoutes = (app) => {
    // Account
    router.get("/account/findone", getAccount);
    router.post("/register", register);
    router.post("/login", login);
    router.get("/account/all", getAllAccounts);
    router.put("/account/change-password", updateAccount);
    router.delete("/account/:id", deleteAccount);

    // Card
    router.get("/card/info/:id", getCard);
    router.post("/card", createCard);
    router.get("/card/all", getAllCards);
    router.put("/card/change-password", updateCard);
    router.delete("/card/:id", deleteCard);

    // Class
    router.get("/class/info/:id", getClass);
    router.get("/class/all", getAllClasss);
    router.get("/class/findone", getClass);
    router.post("/class", createClass);
    router.put("/class/change-password", updateClass);
    router.delete("/class/:id", deleteClass);

    // FolderDetail
    // Folder
    // groupRole
    router.get("/grouprole/info/:id", getGroupRole);
    router.post("/grouprole", createGroupRole);
    router.get("/grouprole/all", getAllGroupRoles);
    router.put("/grouprole/change-password", updateGroupRole);
    router.delete("/grouprole/:id", deleteGroupRole);

    // Group
    router.get("/group/info/:id", getGroup);
    router.post("/group", createGroup);
    router.get("/group/all", getAllGroups);
    router.put("/group/change-password", updateGroup);
    router.delete("/group/:id", deleteGroup);

    // Member
    router.post("/member", createMember);
    router.put("/member", updateMember);

    // Role
    router.get("/role/info/:id", getRole);
    router.post("/role", createRole);
    router.get("/role/all", getAllRoles);
    router.put("/role/change-password", updateRole);
    router.delete("/Role/:id", deleteRole);

    // StudySet
    router.get("/studyset/info/:id", getStudySet);
    router.post("/studyset", createStudySet);
    router.get("/studyset/all", getAllStudySets);
    router.put("/studyset/change-password", updateStudySet);
    router.delete("/studyset/:id", deleteStudySet);

    // User
    router.get("/user/info/:id", getUser);
    router.get("/user", getUsers);
    router.put("/user", updateUser);

    return app.use("/api/", router);
};

module.exports = initAPIRoutes; // export default
