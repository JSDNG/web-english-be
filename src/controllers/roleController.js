const { getAllRole, getRoleById, createNewRole, updateRoleById, deleteRoleById } = require("../services/roleService");

const createRole = async (req, res) => {
    try {
        if (!req.body.url || !req.body.description) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await createNewRole(req.body);
            res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT,
            });
        }
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
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
    try {
        if (!req.body.url || !req.body.description) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await updateRoleById(req.body);
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT,
            });
        }
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
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
