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
            };
        }
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
        };
    }
};
const getAllClass = async () => {
    try {
        // Relationships
        // let results = [];
        let results = await db.Class.findAll({
            include: { model: db.User, where: { id: 1 }, attributes: ["id", "username", "image", "Member"] },
            attributes: ["id", "className", "description"],
            raw: true,
            nest: true,
        });
        console.log(">>>> check ", results);
        let data = results && results.length > 0 ? results : {};
        return {
            EC: 0,
            EM: " All class",
            DT: data,
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
        };
    }
};

const getClassById = async (id) => {
    try {
        let results = await db.Class.findByPk(id);
        let data = results && results.length > 0 ? results : {};
        return {
            EC: 1,
            EM: " All class",
            DT: data.get({ plain: true }),
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
        };
    }
};

const updateClassById = async (password, id) => {
    await db.Class.update(
        {
            password,
        },
        {
            where: { id: id },
        }
    );
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
