const { getAllCard, getCardById, createNewCard, updateCardById, deleteCardById } = require("../services/cardService");

const createCard = async (req, res) => {
    let { term, definition, studySetId } = req.body;
    if (!term || !definition) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await createNewCard(term, definition, studySetId);
        res.status(200).json({
            EC: 0,
            EM: "Create Card",
        });
    }
};

const getAllCards = async (req, res) => {
    let results = await getAllCard();
    return res.status(200).json({
        EC: 0,
        EM: "ok",
        DT: results,
    });
};

const updateCard = async (req, res) => {
    let { id, password } = req.body;
    if (!id || !password) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await updateCardById(password, id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const deleteCard = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await deleteCardById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const getCard = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        let data = await getCardById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
            DT: data,
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
