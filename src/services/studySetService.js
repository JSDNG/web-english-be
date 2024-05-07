const db = require("../models");

const getAllStudySet = async () => {
    try {
        let data = await db.StudySet.findAll({
            include: { model: db.Card, attributes: ["id", "term", "definition", "studySetId"] },
            attributes: ["id", "studySetName", "userId"],
        });
        console.log(data);
        //let data = results && results.length > 0 ? results : {};
        return {
            EC: 0,
            EM: "Get All Study Set",
            DT: data,
        };
    } catch (err) {
        console.log(err);
        return {
            EC: -1,
            EM: "Somthing wrongs in service... ",
            DT: err,
        };
    }
};

const getStudySetById = async (id) => {
    try {
        let data = await db.StudySet.findByPk(id);
        //let data = results && results.length > 0 ? results : {};
        return {
            EC: 0,
            EM: "Get one study set",
            DT: data.get({ plain: true }),
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthing wrongs in service... ",
            DT: "",
        };
    }
};

const createNewStudySet = async (rawData) => {
    try {
        let data = await db.StudySet.create({
            studySetName: rawData.studySetName,
            createDate: Date.now(),
            userId: rawData.userId,
        });
        return {
            EC: 0,
            EM: "Create Study Set",
            DT: "",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthing wrongs in service... ",
            DT: "",
        };
    }
};
const updateStudySetById = async (rawData) => {
    try {
        let data = await db.StudySet.update(
            {
                studySetName: rawData.studySetName,
            },
            {
                where: { id: rawData.id },
            }
        );
        return {
            EC: 0,
            EM: "Updated",
            DT: "",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthing wrongs in service... ",
            DT: "",
        };
    }
};

const deleteStudySetById = async (id) => {
    try {
        let data = await db.StudySet.destroy({
            where: {
                id: id,
            },
        });
        return {
            EC: 0,
            EM: "Daleted",
            DT: "",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthing wrongs in service... ",
            DT: "",
        };
    }
};
module.exports = {
    getAllStudySet,
    getStudySetById,
    createNewStudySet,
    updateStudySetById,
    deleteStudySetById,
};
