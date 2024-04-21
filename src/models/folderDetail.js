module.exports = (sequelize, Sequelize) => {
    const FolderDetail = sequelize.define("FolderDetail", {
        folderId: {
            type: Sequelize.INTEGER,
        },
        studySetId: {
            type: Sequelize.INTEGER,
        },
    });

    return FolderDetail;
};
