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
            include: { model: db.User, attributes: [], through: { attributes: [] } },
            raw: true,
            nest: true,
            group: ["Class.id"],
        });
        // Sắp xếp data theo createDate giảm dần
        data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        for (let j = 0; j < data.length; j++) {
            const temp = data[j];
            let userInfo = await db.User.findByPk(temp.userId, { attributes: ["id", "username", "image"] });
            temp.userId = userInfo.get({ plain: true });
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

const getClassById = async (id) => {
    try {
        let data = await db.Class.findOne({
            where: { id: id },
            attributes: ["id", "className", "createDate", "description", "userId"],
            include: { model: db.Folder, attributes: ["id", "folderName", "userId", "classId"] },
            include: { model: db.User, attributes: ["id", "username", "image"], through: { attributes: [] } },
        });

        let userInfo = await db.User.findByPk(data.userId, { attributes: ["id", "username", "image"] });
        data.userId = userInfo.get({ plain: true });
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
module.exports = {
    getAllClass,
    getClassById,
    createNewClass,
    updateClassById,
    deleteClassById,
};
