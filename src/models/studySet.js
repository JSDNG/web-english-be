module.exports = (sequelize, Sequelize) => {
    const StudySet = sequelize.define("StudySet", {
        studySetName: {
            type: Sequelize.STRING,
        },
        createDate: {
            type: Sequelize.DATE,
        },
        classId: {
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
    });
    StudySet.associate = function (models) {
        StudySet.belongsTo(models.Class, { foreignKey: "classId" });
        StudySet.belongsTo(models.User, { foreignKey: "userId" });
        StudySet.belongsToMany(models.Folder, { through: models.FolderDetail, foreignKey: "studySetId" });
        StudySet.hasMany(models.Card, { foreignKey: "studySetId" });
    };
    return StudySet;
};
