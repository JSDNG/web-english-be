const db = require("../models");

const getAll = async () => {
    let lists = [];
    lists = await db.Account.findAll({
        attributes: ["id", "email", "password"],
    });
    return lists;
};
module.exports = { getAll };
