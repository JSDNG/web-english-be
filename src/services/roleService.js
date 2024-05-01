const db = require("../models");

const getAllRole = async () => {
    // test relationships
    let roles = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 }, attributes: ["name", "description"] },
        attributes: ["id", "url", "description"],
        raw: true,
        nest: true,
    });
    // console.log(">>>> check ", roles);
    // let lists = [];
    // lists = await db.Role.findAll();
    return { roles };
};

const getRoleById = async (id) => {
    let data = await db.Role.findByPk(id);
    //let data = results && results.length > 0 ? results : {};
    return data.get({ plain: true });
};

const createNewRole = async (rawData) => {
    try {
        await db.Role.create({
            url: rawData.url,
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
            EM: "Somthin wrongs in service... ",
            DT: "",
        };
    }
};
const updateRoleById = async (password, id) => {
    try {
        await db.Role.update(
            {
                password,
            },
            {
                where: { id: id },
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
            EM: "Somthin wrongs in service... ",
            DT: "",
        };
    }
};

const deleteRoleById = async (id) => {
    await db.Role.destroy({
        where: {
            id: id,
        },
    });
};
module.exports = {
    getAllRole,
    getRoleById,
    createNewRole,
    updateRoleById,
    deleteRoleById,
};
