const db = require("../models");
const checkUserId = async (id) => {
    let userId = await db.User.findOne({
        where: { id: id },
    });

    if (userId) {
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
const createNewUser = async (username, groupId, accountId) => {
    let image =
        "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";
    const binaryData = Buffer.from(image, "base64");
    try {
        await db.User.create({
            username: username,
            image: binaryData,
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
        if (!results.length > 0) {
            return {
                EC: 0,
                EM: "get data success",
                DT: "",
            };
        }
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
        let isUserId = await checkUserId(id);
        if (!isUserId) {
            return {
                EC: 1,
                EM: "User doesn't already exist",
                DT: "",
            };
        }
        let data = await db.User.findByPk(id, { attributes: ["id", "username", "image"] });
        let data1 = data.get({ plain: true });

        // Chuyển đổi hình ảnh từ BLOB sang Base64
        const imageBuffer = data1.image; // Giả sử hình ảnh được lưu trong trường "image" của bản ghi
        const base64Image = Buffer.from(imageBuffer, "binary").toString("base64");
        data1.image = base64Image;
        return {
            EC: 0,
            EM: "get data success",
            DT: data1,
        };
    } catch (err) {
        console.log(err);
        return {
            EC: -1,
            EM: "Something wrongs in service... ",
            DT: "",
        };
    }
};

const updateUserById = async (rawData) => {
    try {
        let isUserId = await checkUserId(rawData.id);
        if (!isUserId) {
            return {
                EC: 1,
                EM: "User doesn't already exist",
                DT: "",
            };
        }
        let isUsername = await checkUsername(rawData.username);
        if (isUsername) {
            return {
                EC: 1,
                EM: "Username already exists",
                DT: "",
            };
        }
        const binaryData = Buffer.from(rawData.image, "base64");
        if (rawData.image) {
            let user = await db.User.update(
                {
                    username: rawData.username,
                    image: binaryData,
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
            attributes: ["id", "username"],
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
