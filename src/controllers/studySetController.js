const {
    getAllStudySet,
    getStudySetById,
    createNewStudySet,
    updateStudySetById,
    deleteStudySetById,
} = require("../services/studySetService");
const { createNewCard } = require("../services/cardService");
const createStudySet = async (req, res) => {
    try {
        if (!req.body.studySetName || !req.body.userId) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await createNewStudySet(req.body);
            let studySetId = data.DT && data.DT.toString();
            if (studySetId) {
                const cards = req.body.card.map((item, index) => ({
                    ...item,
                    studySetId: studySetId,
                }));
                let data1 = await createNewCard(cards);
                return res.status(200).json({
                    EC: data1.EC,
                    EM: data1.EM,
                    DT: "",
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};

const getAllStudySets = async (req, res) => {
    try {
        let data = await getAllStudySet();
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT,
        });
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};

const updateStudySet = async (req, res) => {
    try {
        if (!req.body.studySetName || !req.body.id) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await updateStudySetById(req.body);
            return res.status(200).json({
                EC: data.EC,
                EM: data.EC,
                DT: data.DT,
            });
        }
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};

const deleteStudySet = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await deleteStudySetById(req.params.id);
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT,
            });
        }
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};

const getStudySet = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await getStudySetById(id);
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT,
            });
        }
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
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
