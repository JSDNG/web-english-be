const db = require("../models");

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

const createNewUser = async (username, groupId, accountId) => {
    try {
        await db.User.create({
            username: username,
            image: null,
            createDate: Date.now,
            groupId: groupId,
            accountId: accountId,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User.",
        });
    }
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
