const {
    getAllGroupRole,
    getGroupRoleById,
    createNewGroupRole,
    updateGroupRoleById,
    deleteGroupRoleById,
} = require("../services/groupRoleService");

const createGroupRole = async (req, res) => {
    let { groupId, roleId } = req.body;
    if (!groupId || !roleId) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await createNewGroupRole(groupId, roleId);
        res.status(200).json({
            EC: 0,
            EM: "Create GroupRole",
        });
    }
};

const getAllGroupRoles = async (req, res) => {
    let results = await getAllGroupRole();
    return res.status(200).json({
        EC: 0,
        EM: "ok",
        DT: results,
    });
};

const updateGroupRole = async (req, res) => {
    let { id, password } = req.body;
    if (!id || !password) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await updateGroupRoleById(password, id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const deleteGroupRole = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await deleteGroupRoleById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const getGroupRole = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        let data = await getGroupRoleById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
            DT: data,
        });
    }
};
module.exports = {
    getAllGroupRoles,
    createGroupRole,
    getGroupRole,
    updateGroupRole,
    deleteGroupRole,
};
