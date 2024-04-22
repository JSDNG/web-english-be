module.exports = (sequelize, Sequelize) => {
    const Folder = sequelize.define("Folder", {
        folderName: {
            type: Sequelize.STRING,
        },
        createDate: {
            type: Sequelize.DATE,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
    });
    Folder.associate = function (models) {
        Folder.belongsTo(models.User, { foreignKey: "userId" });
        Folder.belongsToMany(models.StudySet, { through: models.FolderDetail, foreignKey: "folderId" });
    };

    return Folder;
};
