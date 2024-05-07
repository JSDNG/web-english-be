const { raw } = require("express");
const db = require("../models");

const getAllCard = async () => {
    // test relationships
    // let newgroup = await db.Card.findOne({
    //     where: { id: 2 },
    //     include: { model: db.StudySet },
    //     raw: true,
    //     nest: true,
    // });

    // console.log(">>>> check ", roles);
    try {
        let results = await db.Card.findAll();
        let data = results && results.length > 0 ? results : {};
        return {
            EC: 0,
            EM: "Get success",
            DT: data,
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
            DT: "",
        };
    }
};

const getCardById = async (id) => {
    try {
        let results = await db.Card.findByPk(id);
        let data = results && results.length > 0 ? results : {};
        return {
            EC: 0,
            EM: "Get success",
            data: data.get({ plain: true }),
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
            DT: "",
        };
    }
};

const createNewCard = async (rawData) => {
    try {
        await db.Card.create({
            term: rawData.term,
            definition: rawData.definition,
            studySetId: rawData.studySetId,
        });
        return {
            EC: 0,
            EM: "Create card success",
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
const updateCardById = async (rawData) => {
    try {
        await db.Card.update(
            {
                term: rawData.term,
                definition: rawData.definition,
                studySetId: rawData.studySetId,
            },
            {
                where: { id: rawData.id },
            }
        );
        return {
            EC: 0,
            EM: "Card updated success",
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

const deleteCardById = async (id) => {
    try {
        await db.Card.destroy({
            where: {
                id: id,
            },
        });
        return {
            EC: 0,
            EM: "Deleted",
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
module.exports = {
    getAllCard,
    getCardById,
    createNewCard,
    updateCardById,
    deleteCardById,
};
