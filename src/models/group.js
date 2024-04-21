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
        Group.belongsTo(models.Role, { foreignKey: "role_id" });
    };
    return Group;
};
