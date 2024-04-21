module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
        url: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
    });

    return Role;
};
