const { raw } = require("express");
const db = require("../models");

const getAllRole = async () => {
    try {
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
        return { EC: 0, EM: "ok", DT: roles };
    } catch (err) {
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};

const getRoleById = async (id) => {
    try {
        let results = await db.Role.findByPk(id);
        let data = results && results.length > 0 ? results : {};
        return {
            EC: 0,
            EM: "Get Role",
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
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};
const updateRoleById = async (rawData) => {
    try {
        await db.Role.update(
            {
                url: rawData.url,
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

const deleteRoleById = async (id) => {
    try {
        await db.Role.destroy({
            where: {
                id: id,
            },
        });
        return {
            EC: 0,
            EM: "Delete",
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
    getAllRole,
    getRoleById,
    createNewRole,
    updateRoleById,
    deleteRoleById,
};
