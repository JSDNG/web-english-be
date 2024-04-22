const Group = require("./group");
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("Role", {
        url: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
    });
    Role.associate = function (models) {
        Role.belongsToMany(models.Group, { through: models.GroupRole, foreignKey: "roleId" });
    };
    return Role;
};
