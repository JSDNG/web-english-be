module.exports = (sequelize, Sequelize) => {
    const FolderDetail = sequelize.define("folderDetail", {
        folderId: {
            type: Sequelize.INTEGER,
        },
        studySetId: {
            type: Sequelize.INTEGER,
        },
    });

    return FolderDetail;
};
