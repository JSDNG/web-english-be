module.exports = (sequelize, Sequelize) => {
    const StudySet = sequelize.define(
        "StudySet",
        {
            studySetName: {
                type: Sequelize.STRING,
            },
            createDate: {
                type: Sequelize.DATE,
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
    StudySet.associate = function (models) {
        StudySet.belongsTo(models.User, { foreignKey: "userId" });
        StudySet.belongsToMany(models.Folder, { through: models.FolderDetail, foreignKey: "studySetId" });
        StudySet.hasMany(models.Card, { foreignKey: "studySetId" });
    };
    return StudySet;
};
