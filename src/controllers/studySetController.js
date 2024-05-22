const {
    getAllStudySet,
    getSetsByPage,
    getStudySetById,
    createNewStudySet,
    updateStudySetById,
    deleteStudySetById,
} = require("../services/studySetService");
const { createNewCard, updateCardById, deleteCardById, deleteCardByStudySetId } = require("../services/cardService");
const { deleteFolderDetailByStudySetId } = require("../services/folderDetailService");
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
                const cards = req.body.cards.map((item, index) => ({
                    ...item,
                    studySetId: studySetId,
                }));
                let data1 = await createNewCard(cards);
                return res.status(200).json({
                    EC: data1.EC,
                    EM: data1.EM,
                    DT: data1.DT,
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
        console.log(req.params.page);
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await getSetsByPage(+page, +limit);
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT,
            });
        } else {
            let data = await getAllStudySet();
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

const updateStudySet = async (req, res) => {
    try {
        if (!req.body.studySetName || !req.body.id || !req.body.userId) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await updateStudySetById(req.body);
            const item = req.body.card.map(async (item) => {
                if (item.status === "0") {
                    item.studySetId = req.body.id;
                    delete item.status;
                    await createNewCard([item]);
                } else if (item.status === "1") {
                    await updateCardById(item);
                } else if (item.status === "2") {
                    await deleteCardById(item.id);
                }
            });
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT,
            });
        }
    } catch (err) {
        console.log(err);
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
            let data = await deleteFolderDetailByStudySetId(req.params.id);
            let data1 = await deleteCardByStudySetId(req.params.id);
            if (data1 && data1.EC === 0) {
                let data = await deleteStudySetById(req.params.id);
                return res.status(200).json({
                    EC: data.EC,
                    EM: data.EM,
                    DT: data.DT,
                });
            }
        }
    } catch (err) {
        console.log(err);
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
