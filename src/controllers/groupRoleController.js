const { createNewGroupRole, updateGroupRoleById } = require("../services/groupRoleService");

const createGroupRole = async (req, res) => {
    try {
        let { groupId, roleId } = req.body;
        if (!groupId || !roleId) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await createNewGroupRole(groupId, roleId);
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

const deleteGroupRole = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await updateGroupRoleById(req.body.id);
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

module.exports = {
    createGroupRole,
    deleteGroupRole,
};
