const db = require("../models");

const getAllStudySet = async () => {
    let lists = [];
    lists = await db.StudySet.findAll();
    return lists;
};

const getStudySetById = async (id) => {
    let data = await db.StudySet.findByPk(id);
    //let data = results && results.length > 0 ? results : {};
    return data.get({ plain: true });
};

const createNewStudySet = async (studySetName, classId, userId) => {
    await db.StudySet.create({
        studySetName: studySetName,
        createDate: Date.now(),
        classId: null,
        userId: null,
    });
};
const updateStudySetById = async (password, id) => {
    await db.StudySet.update(
        {
            password,
        },
        {
            where: { id: id },
        }
    );
};

const deleteStudySetById = async (id) => {
    await db.StudySet.destroy({
        where: {
            id: id,
        },
    });
};
module.exports = {
    getAllStudySet,
    getStudySetById,
    createNewStudySet,
    updateStudySetById,
    deleteStudySetById,
};
