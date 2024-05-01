const db = require("../models");

const createNewGroupRole = async (groupId, roleId) => {
    try {
        await db.GroupRole.create({
            groupId: groupId,
            roleId: roleId,
        });
        return {
            EC: 0,
            EM: "ok",
            DT: "",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
            DT: "",
        };
    }
};
const deleteGroupRoleById = async (id) => {
    try {
        await db.GroupRole.destroy({
            where: {
                id: id,
            },
        });
        return {
            EC: 0,
            EM: "OK",
            DT: "",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
            DT: "",
        };
    }
};

module.exports = {
    createNewGroupRole,
    deleteGroupRoleById,
};
