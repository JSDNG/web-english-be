module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("Class", {
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
    });
    Class.associate = function (models) {
        Class.belongsToMany(models.User, { through: models.Student, foreignKey: "classId" });
        Class.belongsTo(models.User, { foreignKey: "userId" });
        Class.hasMany(models.StudySet, { foreignKey: "classId" });
    };

    return Class;
};
