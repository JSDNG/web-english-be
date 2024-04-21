module.exports = (sequelize, Sequelize) => {
    const StudySet = sequelize.define("studySet", {
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

    return StudySet;
};
