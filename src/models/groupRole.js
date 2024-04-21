module.exports = (sequelize, Sequelize) => {
    const GroupRole = sequelize.define("groupRole", {
        groupId: {
            type: Sequelize.INTEGER,
        },
        roleId: {
            type: Sequelize.INTEGER,
        },
    });

    return GroupRole;
};
