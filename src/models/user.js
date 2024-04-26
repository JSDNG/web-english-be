module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "User",
        {
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
        },
        {
            // options
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
    User.associate = function (models) {
        User.belongsTo(models.Group, { foreignKey: "groupId" });
        User.belongsTo(models.Account, { foreignKey: "accountId" });
        User.hasMany(models.Folder, { foreignKey: "userId" });
        User.belongsToMany(models.Class, { through: models.Member, foreignKey: "userId" });
        User.hasMany(models.StudySet, { foreignKey: "userId" });
    };

    return User;
};
