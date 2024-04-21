module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        image: {
            type: Sequelize.BLOB,
        },
        createDate: {
            type: Sequelize.DATE,
        },
        groupId: {
            type: Sequelize.INTEGER,
        },
        accountId: {
            type: Sequelize.INTEGER,
        },
    });

    return User;
};
