module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("Account", {
        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
        },
    });
    Account.associate = function (models) {
        Account.hasOne(models.User, { foreignKey: "accountId" });
    };
    return Account;
};
