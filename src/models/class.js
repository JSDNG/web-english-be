module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define(
        "Class",
        {
            className: {
                type: Sequelize.STRING,
            },
            createDate: {
                type: Sequelize.DATE,
            },
            description: {
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.INTEGER,
            },
        },
        {
            // options
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
    Class.associate = function (models) {
        Class.belongsToMany(models.User, { through: models.Member, foreignKey: "classId" });
        Class.belongsTo(models.User, { foreignKey: "userId" });
        Class.hasMany(models.Folder, { foreignKey: "classId" });
    };

    return Class;
};
