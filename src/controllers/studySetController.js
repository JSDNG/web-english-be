const {
    getAllStudySet,
    getStudySetById,
    createNewStudySet,
    updateStudySetById,
    deleteStudySetById,
} = require("../services/studySetService");

const createStudySet = async (req, res) => {
    let { studySetName, classId, userId } = req.body;
    if (!studySetName) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await createNewStudySet(studySetName, classId, userId);
        res.status(200).json({
            EC: 0,
            EM: "Create StudySet",
        });
    }
};

const getAllStudySets = async (req, res) => {
    let results = await getAllStudySet();
    return res.status(200).json({
        EC: 0,
        EM: "ok",
        DT: results,
    });
};

const updateStudySet = async (req, res) => {
    let { id, password } = req.body;
    if (!id || !password) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await updateStudySetById(password, id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const deleteStudySet = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await deleteStudySetById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const getStudySet = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        let data = await getStudySetById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
            DT: data,
        });
    }
};
module.exports = {
    getAllStudySets,
    createStudySet,
    getStudySet,
    updateStudySet,
    deleteStudySet,
};
