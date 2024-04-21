module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("Student", {
        userId: {
            type: Sequelize.INTEGER,
        },
        classId: {
            type: Sequelize.INTEGER,
        },
    });

    return Student;
};
