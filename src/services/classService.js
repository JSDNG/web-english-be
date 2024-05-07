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
        let { count, rows: data } = await db.Class.findAndCountAll({
            //include: { model: db.User, attributes: [] },
            attributes: ["id", "className", "description", "userId"],
            raw: true,
            nest: true,
        });
        // for (let i = 0; i < data.length; i++) {
        //     const count = data[i];
        //     const member = await db.User.count({ where: { studySetId: studySet.id } });
        //     count.member = member;
        // }
        for (let j = 0; j < data.length; j++) {
            const temp = data[j];
            let userInfo = await db.User.findByPk(temp.userId, { attributes: ["id", "username", "image"] });
            temp.userId = userInfo.get({ plain: true });
        }
        data.push({ value: count });
        return {
            EC: 0,
            EM: " All class",
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

const getClassById = async (id) => {
    try {
        let results = await db.Class.findByPk(id);
        let data = results && results.length > 0 ? results : {};
        return {
            EC: 0,
            EM: "Get class",
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
        // check rawData.userId
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
                EM: "Get class",
                DT: data.get({ plain: true }),
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
    await db.Class.destroy({
        where: {
            id: id,
        },
    });
};
module.exports = {
    getAllClass,
    getClassById,
    createNewClass,
    updateClassById,
    deleteClassById,
};
