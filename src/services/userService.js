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
            DT: "",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Something wrongs in service... ",
            DT: "",
        };
    }
};

const getAllUser = async () => {
    try {
        let results = await db.User.findAll({
            attributes: ["id", "username", "image"],
            include: [
                { model: db.Group, attributes: ["name", "description"] },
                { model: db.Account, attributes: ["email"] },
            ],
        });

        let data = results && results.length > 0 ? results : {};
        return {
            EC: 0,
            EM: "get data success",
            DT: data,
        };
    } catch (e) {
        return {
            EC: -1,
            EM: "Something wrongs in service... ",
            DT: "",
        };
    }
};

const getUserById = async (id) => {
    try {
        let data = await db.User.findByPk(id);
        //let data = results && results.length > 0 ? results : {};
        return {
            EC: 0,
            EM: "get success",
            DT: data.get({ plain: true }),
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Something wrongs in service... ",
            DT: "",
        };
    }
};

const updateUserById = async (rawData) => {
    try {
        let isUsername = await checkUsername(rawData.username);
        if (isUsername) {
            return {
                EC: 1,
                EM: "Username already exists",
                DT: "",
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
                DT: "",
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
                DT: "",
            };
        }
    } catch (err) {
        return {
            EC: -1,
            EM: "Something wrongs in service... ",
            DT: "",
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
            EM: "Something wrongs in service... ",
            DT: "",
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
