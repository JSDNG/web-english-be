const db = require("../models");
const checkUsername = async (username) => {
    let user = await db.User.findOne({
        where: { username: username },
    });

    if (user) {
        return true;
    }
    return false;
};
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
    try {
        let lists = await db.User.findAll({
            attributes: ["id", "username", "image"],
            include: [
                { model: db.Group, attributes: ["name", "description"] },
                { model: db.Account, attributes: ["email"] },
            ],
        });
        if (lists) {
            return {
                EM: "get data success",
                EC: 0,
                DT: lists,
            };
        } else {
            return {
                EM: "get data success",
                EC: 0,
                DT: "",
            };
        }
    } catch (e) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
        };
    }
};

const getUserById = async (id) => {
    let data = await db.User.findByPk(id);
    //let data = results && results.length > 0 ? results : {};
    return {
        EC: 0,
        EM: "get success",
        DT: data.get({ plain: true }),
    };
};

const updateUserById = async (rawData) => {
    try {
        let isUsername = await checkUsername(rawData.username);
        if (isUsername === true) {
            return {
                EC: 1,
                EM: "Username already exists",
            };
        }
        if (rawData.image) {
            let user = await db.User.update(
                {
                    username: rawData.username,
                    image: rawData.image,
                },
                {
                    where: { id: rawData.id },
                }
            );
            return {
                EC: 0,
                EM: "User updated successfully",
            };
        } else {
            let user = await db.User.update(
                {
                    username: rawData.username,
                },
                {
                    where: { id: rawData.id },
                }
            );
            return {
                EC: 0,
                EM: "User updated successfully",
            };
        }
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
        };
    }
};
const getUsersByPage = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "image"],
            include: [
                { model: db.Group, attributes: ["name", "description"] },
                { model: db.Account, attributes: ["email"] },
            ],
        });
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows,
        };
        return {
            EC: 0,
            EM: "get success",
            DT: data,
        };
    } catch (e) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
        };
    }
};
module.exports = {
    getAllUser,
    getUserById,
    createNewUser,
    updateUserById,
    getUsersByPage,
};
