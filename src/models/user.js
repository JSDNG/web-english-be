module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        image: {
            type: Sequelize.BLOB,
        },
        createDate: {
            type: Sequelize.DATE,
        },
        groupId: {
            type: Sequelize.INTEGER,
        },
        accountId: {
            type: Sequelize.INTEGER,
        },
    });
    User.associate = function (models) {
        User.belongsTo(models.Group, { foreignKey: "groupId" });
        User.belongsTo(models.Account, { foreignKey: "accountId" });
        User.hasMany(models.Folder, { foreignKey: "userId" });
        User.belongsToMany(models.Class, { through: models.Student, foreignKey: "userId" });
        User.hasMany(models.StudySet, { foreignKey: "userId" });
    };

    return User;
};
