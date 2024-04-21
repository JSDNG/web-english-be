module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("Class", {
        className: {
            type: Sequelize.STRING,
        },
        createDate: {
            type: Sequelize.DATE,
        },
        description: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
    });

    return Class;
};
