module.exports = (sequelize, Sequelize) => {
    const Folder = sequelize.define("folder", {
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

    return Folder;
};
