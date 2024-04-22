module.exports = (sequelize, Sequelize) => {
    const GroupRole = sequelize.define("GroupRole", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        groupId: {
            type: Sequelize.INTEGER,
        },
        roleId: {
            type: Sequelize.INTEGER,
        },
    });

    return GroupRole;
};
