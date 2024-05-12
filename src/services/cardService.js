const { raw } = require("express");
const db = require("../models");

const checkCardId = async (data) => {
    let id = await db.Card.findOne({
        where: { id: data },
    });
    if (id) {
        return true;
    }
    return false;
};
const checkStudySetId = async (data) => {
    let id = await db.StudySet.findOne({
        where: { id: data },
    });
    if (id) {
        return true;
    }
    return false;
};
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
            EM: "Something wrongs in service... ",
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
            EM: "Something wrongs in service... ",
            DT: "",
        };
    }
};

const createNewCard = async (rawData) => {
    try {
        await db.Card.bulkCreate(rawData);
        return {
            EC: 0,
            EM: "Create card success",
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
const updateCardById = async (rawData) => {
    try {
        await db.Card.update(
            {
                term: rawData.term,
                definition: rawData.definition,
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
        console.log(err);
        return {
            EC: -1,
            EM: "Something wrongs in service... ",
            DT: "",
        };
    }
};

const deleteCardById = async (id) => {
    try {
        let isCardId = checkCardId(id);
        if (isCardId) {
            let data = await db.Card.destroy({
                where: { id: id },
            });
            return {
                EC: 0,
                EM: "Deleted Card",
                DT: "",
            };
        } else {
            return {
                EC: 1,
                EM: "Card doesn't already exist",
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
const deleteCardByStudySetId = async (id) => {
    try {
        let isId = checkStudySetId(id);
        if (isId) {
            let data = await db.Card.destroy({
                where: { studySetId: id },
            });
            return {
                EC: 0,
                EM: "Deleted Card",
                DT: "",
            };
        } else {
            return {
                EC: 0,
                EM: "StudySetId doesn't already exist",
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
module.exports = {
    getAllCard,
    getCardById,
    createNewCard,
    updateCardById,
    deleteCardById,
    deleteCardByStudySetId,
};
