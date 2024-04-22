const Role = require("./role");

module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("Group", {
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
    });
    Group.associate = function (models) {
        Group.belongsToMany(models.Role, { through: models.GroupRole, foreignKey: "groupId" });
        Group.hasMany(models.User, { foreignKey: "groupId" });
    };
    return Group;
};
