const db = require("../models");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPass = (password) => {
    return bcrypt.hashSync(password, salt);
};
const checkEmail = async (email) => {
    let account = await db.Account.findOne({
        where: { email: email },
    });

    if (account) {
        return true;
    }
    return false;
};
const checkUsername = async (username) => {
    let user = await db.User.findOne({
        where: { username: username },
    });

    if (user) {
        return true;
    }
    return false;
};
const createNewAccount = async (rawData) => {
    let hashpass = hashPass(rawData.password);
    try {
        let isEmail = await checkEmail(rawData.email);
        if (isEmail === true) {
            return {
                EC: 1,
                EM: "Email already exists",
            };
        }
        let isUsername = await checkUsername(rawData.username);
        if (isUsername === true) {
            return {
                EC: 1,
                EM: "Username already exists",
            };
        } else {
            let data = await db.Account.create({
                email: rawData.email,
                password: hashpass,
            });
            return {
                EC: 0,
                EM: "Account created successfully",
                DT: data.id,
            };
        }
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
        };
    }
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
