module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("Student", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        classId: {
            type: Sequelize.INTEGER,
        },
    });

    return Student;
};
