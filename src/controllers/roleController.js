const { getAllRole, getRoleById, createNewRole, updateRoleById, deleteRoleById } = require("../services/roleService");

const createRole = async (req, res) => {
    let { url, description } = req.body;
    if (!url || !description) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await createNewRole(url, description);
        res.status(200).json({
            EC: 0,
            EM: "Create Role",
        });
    }
};

const getAllRoles = async (req, res) => {
    let results = await getAllRole();
    return res.status(200).json({
        EC: 0,
        EM: "ok",
        DT: results,
    });
};

const updateRole = async (req, res) => {
    let { id, password } = req.body;
    if (!id || !password) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await updateRoleById(password, id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const deleteRole = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await deleteRoleById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const getRole = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        let data = await getRoleById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
            DT: data,
        });
    }
};
module.exports = {
    getAllRoles,
    createRole,
    getRole,
    updateRole,
    deleteRole,
};
