module.exports = (sequelize, Sequelize) => {
    const Folder = sequelize.define(
        "Folder",
        {
            folderName: {
                type: Sequelize.STRING,
            },
            createDate: {
                type: Sequelize.DATE,
            },
            userId: {
                type: Sequelize.INTEGER,
            },
            classId: {
                type: Sequelize.INTEGER,
            },
        },
        {
            // options
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
    Folder.associate = function (models) {
        Folder.belongsTo(models.User, { foreignKey: "userId" });
        Folder.belongsTo(models.Class, { foreignKey: "classId" });
        Folder.belongsToMany(models.StudySet, { through: models.FolderDetail, foreignKey: "folderId" });
    };

    return Folder;
};
