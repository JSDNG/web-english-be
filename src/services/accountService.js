const db = require("../models");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPass = (password) => {
    return bcrypt.hashSync(password, salt);
};
const getAllAccount = async () => {
    let lists = [];
    lists = await db.Account.findAll();
    return lists;
};

const getAccountById = async (id) => {
    let data = await db.Account.findByPk(id);
    //let data = results && results.length > 0 ? results : {};
    return data.get({ plain: true });
};

const createNewAccount = async (email, password) => {
    let hashpass = hashPass(password);
    try {
        await db.Account.create({
            email: email,
            password: hashpass,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Account.",
        });
    }
};
const updateAccountById = async (password, id) => {
    await db.Account.update(
        {
            password,
        },
        {
            where: { id: id },
        }
    );
};

const deleteAccountById = async (id) => {
    await db.Account.destroy({
        where: {
            id: id,
        },
    });
};
module.exports = {
    getAllAccount,
    getAccountById,
    createNewAccount,
    updateAccountById,
    deleteAccountById,
};
