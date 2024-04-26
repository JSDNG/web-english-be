const db = require("../models");

const createNewUser = async (username, groupId, accountId) => {
    let image = "abc";
    try {
        await db.User.create({
            username: username,
            image: image,
            createDate: Date.now(),
            groupId: groupId,
            accountId: accountId,
        });
        return {
            EC: 0,
            EM: "User created successfully",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
        };
    }
};

const getAllUser = async () => {
    let lists = [];
    lists = await db.User.findAll();
    return lists;
};

const getUserById = async (id) => {
    let data = await db.User.findByPk(id);
    //let data = results && results.length > 0 ? results : {};
    return data.get({ plain: true });
};

const updateUserById = async (password, id) => {
    await db.User.update(
        {
            password,
        },
        {
            where: { id: id },
        }
    );
};

const deleteUserById = async (id) => {
    await db.User.destroy({
        where: {
            id: id,
        },
    });
};
module.exports = {
    getAllUser,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById,
};
