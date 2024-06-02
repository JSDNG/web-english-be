const db = require("../models");

const checkClassName = async (className) => {
    let check = await db.Class.findOne({
        where: { className: className },
    });

    if (check) {
        return true;
    }
    return false;
};
const checkClassId = async (id) => {
    let check = await db.Class.findOne({
        where: { id: id },
    });

    if (check) {
        return true;
    }
    return false;
};
const createNewClass = async (rawData) => {
    try {
        let isClass = await checkClassName(rawData.className);
        if (isClass === true) {
            return {
                EC: 1,
                EM: "Class already exists",
                DT: "",
            };
        } else {
            await db.Class.create({
                className: rawData.className,
                createDate: Date.now(),
                description: rawData.description,
                userId: rawData.userId,
            });
            return {
                EC: 0,
                EM: "Class created successfully",
                DT: "",
            };
        }
    } catch (err) {
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};
const getAllClass = async () => {
    try {
        // Relationships
        let { rows: data } = await db.Class.findAndCountAll({
            attributes: [
                "id",
                "className",
                "createDate",
                "description",
                "userId",
                [db.sequelize.fn("COUNT", db.sequelize.col("Users.id")), "member"],
            ],
            include: [{ model: db.User, attributes: [], through: { attributes: [] } }],
            raw: true,
            nest: true,
            group: ["Class.id"],
        });

        if (!data.length > 0) {
            return {
                EC: 0,
                EM: " All class",
                DT: "",
            };
        }

        data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        for (let j = 0; j < data.length; j++) {
            const temp = data[j];
            let userInfo = await db.User.findByPk(temp.userId, { attributes: ["id", "username", "image"] });
            temp.userId = userInfo.get({ plain: true });
        }
        for (let j = 0; j < data.length; j++) {
            const temp = data[j];

            // Chuyển đổi hình ảnh từ BLOB sang Base64
            const imageBuffer = temp.userId.image; // Giả sử hình ảnh được lưu trong trường "image" của bản ghi
            const base64Image = Buffer.from(imageBuffer, "binary").toString("base64");

            // Gán chuỗi Base64 vào trường "image" của bản ghi
            temp.userId.image = base64Image;
        }
        return {
            EC: 0,
            EM: " All class",
            DT: data,
        };
    } catch (err) {
        console.log(err);
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};

const getClassByPage = async (page, limit) => {
    try {
        // Relationships
        let offset = (page - 1) * limit;
        let { count, rows } = await db.Class.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: [
                "id",
                "className",
                "createDate",
                "description",
                "userId",
                // [db.sequelize.fn("COUNT", db.sequelize.col("Users.id")), "member"],
                [db.sequelize.literal("(SELECT COUNT(*) FROM Member WHERE classId = Class.id)"), "member"],
            ],
            include: { model: db.User, attributes: [], through: { attributes: [] } },
            raw: true,
            nest: true,
            group: ["Class.id"],
        });

        if (!rows.length > 0) {
            return {
                EC: 0,
                EM: " All class",
                DT: "",
            };
        }
        let uniqueArray = [];

        rows.forEach((obj) => {
            if (!uniqueArray.some((item) => item.id === obj.id)) {
                uniqueArray.push(obj);
            }
        });
        let totalPages = Math.ceil(count.length / limit);
        let results = {
            totalRows: count.length,
            totalPages: totalPages,
            data: uniqueArray,
        };
        results.data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        for (let j = 0; j < results.data.length; j++) {
            const temp = results.data[j];
            let userInfo = await db.User.findByPk(temp.userId, { attributes: ["id", "username", "image"] });
            temp.userId = userInfo.get({ plain: true });
        }
        for (let j = 0; j < results.data.length; j++) {
            const temp = results.data[j];

            // Chuyển đổi hình ảnh từ BLOB sang Base64
            const imageBuffer = temp.userId.image; // Giả sử hình ảnh được lưu trong trường "image" của bản ghi
            const base64Image = Buffer.from(imageBuffer, "binary").toString("base64");

            // Gán chuỗi Base64 vào trường "image" của bản ghi
            temp.userId.image = base64Image;
        }
        return {
            EC: 0,
            EM: " All class",
            DT: results,
        };
    } catch (err) {
        console.log(err);
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};
const getClassById = async (id) => {
    try {
        let isClassId = await checkClassId(id);
        if (!isClassId) {
            return {
                EC: 1,
                EM: "Class doesn't already exist",
                DT: "",
            };
        }
        let data = await db.Class.findOne({
            where: { id: id },
            attributes: ["id", "className", "createDate", "description", "userId"],
            include: { model: db.Folder, attributes: ["id", "folderName", "userId", "classId"] },
            //include: { model: db.User, attributes: ["id", "username", "image"], through: { attributes: [] } },
        });

        let userInfo = await db.User.findByPk(data.userId, { attributes: ["id", "username", "image"] });
        data.userId = userInfo.get({ plain: true });

        // Chuyển đổi hình ảnh từ BLOB sang Base64
        const imageBuffer = data.userId.image; // Giả sử hình ảnh được lưu trong trường "image" của bản ghi
        const base64Image = Buffer.from(imageBuffer, "binary").toString("base64");
        data.userId.image = base64Image;
        return {
            EC: 0,
            EM: "Get one class",
            DT: data.get({ plain: true }),
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};

const updateClassById = async (rawData) => {
    try {
        let isClassId = await checkClassId(rawData.id);
        if (!isClassId) {
            return {
                EC: 1,
                EM: "Class doesn't already exist",
                DT: "",
            };
        }
        let isClass = checkClassName(rawData.checkClassName);
        if (isClass) {
            return {
                EC: 1,
                EM: "Class already exists",
                DT: "",
            };
        } else {
            await db.Class.update(
                {
                    className: rawData.className,
                    description: rawData.description,
                },
                {
                    where: { id: rawData.id },
                }
            );
            return {
                EC: 0,
                EM: "Class updated",
                DT: "",
            };
        }
    } catch (err) {
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};

const deleteClassById = async (id) => {
    try {
        let isClassId = await checkClassId(rawData.id);
        if (!isClassId) {
            return {
                EC: 1,
                EM: "Class doesn't already exist",
                DT: "",
            };
        }

        let data = await db.Class.destroy({
            where: {
                id: id,
            },
        });
        return {
            EC: 0,
            EM: "Class deleted",
            DT: "",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};
const getAllMemberByClass = async (id) => {
    try {
        let isClassId = await checkClassId(id);
        if (!isClassId) {
            return {
                EC: 1,
                EM: "Class doesn't already exist",
                DT: "",
            };
        }
        let data = await db.Class.findAll({
            where: { id: id },
            attributes: [],
            include: [
                { model: db.User, attributes: ["id", "username", "image", "groupId"], through: { attributes: [] } },
            ],
            raw: true,
            nest: true,
            //group: ["Class.id"],
        });
        if (!data.length > 0) {
            return {
                EC: 0,
                EM: " All member",
                DT: "",
            };
        }

        // data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        for (let j = 0; j < data.length; j++) {
            const temp = data[j];
            let group = await db.Group.findByPk(temp.Users.groupId, { attributes: ["name"] });
            temp.Users.groupId = group.get({ plain: true });
        }
        for (let j = 0; j < data.length; j++) {
            const temp = data[j];

            // Chuyển đổi hình ảnh từ BLOB sang Base64
            const imageBuffer = temp.Users.image; // Giả sử hình ảnh được lưu trong trường "image" của bản ghi
            const base64Image = Buffer.from(imageBuffer, "binary").toString("base64");

            // Gán chuỗi Base64 vào trường "image" của bản ghi
            temp.Users.image = base64Image;
        }
        return {
            EC: 0,
            EM: "Get member",
            DT: data,
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};
module.exports = {
    getAllClass,
    getClassByPage,
    getClassById,
    createNewClass,
    updateClassById,
    deleteClassById,
    getAllMemberByClass,
};
