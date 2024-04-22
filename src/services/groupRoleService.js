const db = require("../models");

const getAllGroupRole = async () => {
    let lists = [];
    lists = await db.GroupRole.findAll();
    return lists;
};

const getGroupRoleById = async (id) => {
    let data = await db.GroupRole.findByPk(id);
    //let data = results && results.length > 0 ? results : {};
    return data.get({ plain: true });
};

const createNewGroupRole = async (groupId, roleId) => {
    try {
        await db.GroupRole.create({
            groupId: groupId,
            roleId: roleId,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the GroupRole.",
        });
    }
};
const updateGroupRoleById = async (password, id) => {
    await db.GroupRole.update(
        {
            password,
        },
        {
            where: { id: id },
        }
    );
};

const deleteGroupRoleById = async (id) => {
    await db.GroupRole.destroy({
        where: {
            id: id,
        },
    });
};
module.exports = {
    getAllGroupRole,
    getGroupRoleById,
    createNewGroupRole,
    updateGroupRoleById,
    deleteGroupRoleById,
};
