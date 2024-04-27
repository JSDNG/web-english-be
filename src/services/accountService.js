require("dotenv").config();
const db = require("../models");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const { Op } = require("sequelize");
const getGroupWithRoles = require("./jwtService");
const { createJWT } = require("../middleware/jwtAction");
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
const checkPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
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
const registerAccount = async (rawData) => {
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

const loginAcccount = async (rawData) => {
    try {
        let account = await db.Account.findOne({
            // where: {
            //     [Op.or]:[
            //         {email: rawData.emailorphone},
            //         {phone: rawData.emailorphone}
            //     ]
            // }
            where: {
                email: rawData.email,
            },
        });
        if (account) {
            let isPassword = checkPassword(rawData.password, account.password);
            let user = await db.User.findOne({
                where: { accountId: account.id },
            });

            let data = await getGroupWithRoles(user.get({ plain: true }));
            let payload = {
                email: account.email,
                data,
                expiresIn: process.env.JWT_EXIRES_IN,
            };
            let token = createJWT(payload);
            if (isPassword === true) {
                return {
                    EC: 0,
                    EM: "Login in successfully",
                    DT: {
                        access_token: token,
                        data,
                    },
                };
            }
        }
        console.log(">>> Not found email");
        return {
            EC: 1,
            EM: "Email or password is incorrect",
        };
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
    registerAccount,
    loginAcccount,
    updateAccountById,
    deleteAccountById,
};
