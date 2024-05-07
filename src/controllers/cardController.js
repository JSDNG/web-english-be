const { getAllCard, getCardById, createNewCard, updateCardById, deleteCardById } = require("../services/cardService");

const createCard = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await createNewCard(req.body);
            res.status(200).json({
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

const getAllCards = async (req, res) => {
    try {
        let data = await getAllCard();
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

const updateCard = async (req, res) => {
    try {
        if (!req.body.id || !req.body.term || !req.body.definition || !req.body.studySetId) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await updateCardById(req.body);
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

const deleteCard = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await deleteCardById(id);
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

const getCard = async (req, res) => {
    try {
        // if (!id) {
        //     return res.status(200).json({
        //         EC: 1,
        //         EM: "missing required params",
        //         DT: "",
        //     });
        // } else {
        //     let data = await getCardById(id);
        //     return res.status(200).json({
        //         EC: data.EC,
        //         EM: data.EM,
        //         DT: data.DT,
        //     });
        // }
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};
module.exports = {
    getAllCards,
    createCard,
    getCard,
    updateCard,
    deleteCard,
};
