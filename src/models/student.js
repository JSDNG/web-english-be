module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        userId: {
            type: Sequelize.INTEGER,
        },
        classId: {
            type: Sequelize.INTEGER,
        },
    });

    return Student;
};
