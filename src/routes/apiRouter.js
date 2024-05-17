const express = require("express");
const {
    getAllAccounts,
    getAccount,
    changePassword,
    register,
    login,
    logout,
} = require("../controllers/accountController");

const { getAllCards, createCard, getCard, updateCard, deleteCard } = require("../controllers/cardController");
const { getAllClasses, getClass, updateClass, deleteClass, createClass } = require("../controllers/classController");
const { createFolderDetail, deleteFolderDetail } = require("../controllers/folderDetailController");
const {
    getAllFolders,
    getFolder,
    updateFolder,
    deleteFolder,
    createFolder,
} = require("../controllers/folderController");
const { createGroupRole, deleteGroupRole } = require("../controllers/groupRoleController");
const { getAllGroups, createGroup, getGroup, updateGroup, deleteGroup } = require("../controllers/groupController");
const { deleteMember, createMember } = require("../controllers/memberController");
const { getAllRoles, createRole, getRole, updateRole, deleteRole } = require("../controllers/roleController");
const {
    getAllStudySets,
    createStudySet,
    getStudySet,
    updateStudySet,
    deleteStudySet,
} = require("../controllers/studySetController");
const { getUser, updateUser, getUsers } = require("../controllers/userController");
const { checkUserJWT, checkUserPermission } = require("../middleware/jwtAction");
const router = express.Router();

const initAPIRoutes = (app) => {
    //router.all("*", checkUserJWT, checkUserPermission);
    // Account
    router.get("/account/findone", getAccount);
    router.post("/register", register);
    router.post("/login", login);
    router.post("/logout", logout);
    router.get("/account", getAllAccounts);
    router.put("/account/change-password", changePassword);

    // Card
    //router.get("/card", getCard);
    //router.post("/card", createCard);
    //router.get("/card", getAllCards);
    //router.put("/card", updateCard);
    //router.delete("/card/:id", deleteCard);

    // Class
    router.get("/class/:id", getClass);
    router.get("/class", getAllClasses);
    router.post("/class", createClass);
    router.put("/class", updateClass);
    //router.delete("/class/:id", deleteClass);

    // FolderDetail
    router.post("/folderdetail", createFolderDetail);
    //router.delete("/folderdetail/:id", deleteFolderDetail);

    // Folder
    router.get("/folder", getAllFolders);
    router.get("/folder/:id", getFolder);
    router.post("/folder", createFolder);
    router.put("/folder", updateFolder);
    router.delete("/folder/:id", deleteFolder);

    // groupRole

    router.post("/grouprole", createGroupRole);
    router.delete("/grouprole/:id", deleteGroupRole);

    // Group
    router.post("/group", createGroup);
    router.put("/group", updateGroup);
    router.delete("/group/:id", deleteGroup);

    // Member
    router.post("/member", createMember);
    //router.delete("/member/:id", deleteMember);

    // Role
    //router.get("/role/info/:id", getRole);
    router.post("/role", createRole);
    router.get("/role", getAllRoles);
    router.put("/role", updateRole);
    router.delete("/Role/:id", deleteRole);

    // StudySet
    router.get("/studyset/:id", getStudySet);
    router.post("/studyset", createStudySet);
    router.get("/studyset", getAllStudySets);
    router.put("/studyset", updateStudySet);
    router.delete("/studyset/:id", deleteStudySet);

    // User
    router.get("/user/:id", getUser);
    router.get("/user", getUsers);
    router.put("/profile", updateUser);

    return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes; // export default
