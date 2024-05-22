const db = require("../models");

const getAllGroup = async () => {
    let lists = [];
    lists = await db.Group.findAll();
    return lists;
};

const getGroupById = async (id) => {
    let results = await db.Group.findByPk(id);
    let data = results && results.length > 0 ? results : {};
    return data.get({ plain: true });
};

const createNewGroup = async (rawData) => {
    try {
        await db.Group.create({
            name: rawData.name,
            description: rawData.description,
        });
        return {
            EC: 0,
            EM: "ok",
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
const updateGroupById = async (rawData) => {
    try {
        await db.Group.update(
            {
                name: rawData.name,
                description: rawData.description,
            },
            {
                where: { id: rawData.id },
            }
        );
        return {
            EC: 0,
            EM: "OK",
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

const deleteGroupById = async (id) => {
    await db.Group.destroy({
        where: {
            id: id,
        },
    });
};
module.exports = {
    getAllGroup,
    getGroupById,
    createNewGroup,
    updateGroupById,
    deleteGroupById,
};
