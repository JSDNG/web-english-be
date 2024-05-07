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
            EM: "Somthin wrongs in service... ",
            DT: "",
        };
    }
};
const getAllClass = async () => {
    try {
        // Relationships
        let { count, rows } = await db.Class.findAndCountAll({
            include: { model: db.User, attributes: ["id", "username", "image"] },
            attributes: ["id", "className", "description", "userId"],
            raw: true,
            nest: true,
        });
        // let results1 = await db.Class.findAndCountAll({
        //     where: { id: 2 },
        //     include: { model: db.User, attributes: ["id", "username", "image"] },
        //     attributes: ["id", "className", "description", "userId"],
        //     raw: true,
        //     nest: true,
        // });

        // let data = results && results.length > 0 ? results : {};
        // rows.push({ value: count })

        return {
            EC: 0,
            EM: " All class",
            DT: rows,
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
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
            EM: "Somthin wrongs in service... ",
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
            EM: "Somthin wrongs in service... ",
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
