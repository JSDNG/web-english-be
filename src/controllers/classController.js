const {
    getAllClass,
    getClassById,
    createNewClass,
    updateClassById,
    deleteClassById,
} = require("../services/classService");

const createClass = async (req, res) => {
    try {
        if (!req.body.className || !req.body.description || !req.body.userId) {
            return res.status(200).json({
                EC: 1,
                EM: "Missing required parameters",
                DT: "",
            });
        }
        let data = await createNewClass(req.body);

        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT,
        });
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};

const getAllClasses = async (req, res) => {
    try {
        let data = await getAllClass();

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

const updateClass = async (req, res) => {
    try {
        if (!req.body.className || !req.body.description || req.body.id || req.body.userId) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            await updateClassById(req.body);
            return res.status(200).json({
                EC: 0,
                EM: "ok",
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

const deleteClass = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await deleteClassById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const getClass = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
            DT: "",
        });
    } else {
        let data = await getClassById(id);
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT,
        });
    }
};
module.exports = {
    getAllClasses,
    createClass,
    getClass,
    updateClass,
    deleteClass,
};
