const { where } = require("sequelize/lib/sequelize");
const db = require("../models");
const Account = db.accounts;
const Op = db.Sequelize.Op;

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPass = (password) => {
    return bcrypt.hashSync(password, salt);
};
const getAllAccount = async () => {
    let lists = [];
    lists = await Account.findAll();
    return lists;
};

const getAccountById = async (id) => {
    let data = await Account.findByPk(id);
    //let data = results && results.length > 0 ? results : {};
    return data.get({ plain: true });
};

const createNewAccount = async (email, password) => {
    let hashpass = hashPass(password);
    try {
        await Account.create({
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
    await Account.update(
        {
            password,
        },
        {
            where: { id: id },
        }
    );
};

const deleteAccountById = async (id) => {
    await Account.destroy({
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
