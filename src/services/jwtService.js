const db = require("../models");

const getGroupWithRoles = async (user) => {
    try {
        let roles = await db.Group.findOne({
            where: { id: user.groupId },
            attributes: ["id", "name", "description"],
            include: {
                model: db.Role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] },
            },
        });
        return roles ? roles : {};
    } catch (err) {
        return "Something wrong with the server... ";
    }
};
module.exports = getGroupWithRoles;
