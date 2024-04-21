module.exports = (sequelize, Sequelize) => {
    const GroupRole = sequelize.define("GroupRole", {
        groupId: {
            type: Sequelize.INTEGER,
        },
        roleId: {
            type: Sequelize.INTEGER,
        },
    });
    return GroupRole;
};
