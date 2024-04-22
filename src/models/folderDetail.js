module.exports = (sequelize, Sequelize) => {
    const FolderDetail = sequelize.define(
        "FolderDetail",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            folderId: {
                type: Sequelize.INTEGER,
            },
            studySetId: {
                type: Sequelize.INTEGER,
            },
        },
        {
            tableName: "FolderDetail",
        }
    );

    return FolderDetail;
};
