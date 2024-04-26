const {
    getAllClass,
    getClassById,
    createNewClass,
    updateClassById,
    deleteClassById,
} = require("../services/classService");

const createClass = async (req, res) => {
    try {
        if (!req.body.className || !req.body.description) {
            return res.status(200).json({
                EC: 1,
                EM: "Missing required parameters",
            });
        }
        let data = await createNewClass(req.body);

        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
        });
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};

const getAllClasss = async (req, res) => {
    let data = await getAllClass();

    return res.status(200).json({
        EC: data.EC,
        EM: data.EM,
        DT: data.DT,
    });
};

const updateClass = async (req, res) => {
    let { id, password } = req.body;
    if (!id || !password) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await updateClassById(password, id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
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
    let email = req.body.email;
    console.log(">>>", req.body.email);
    if (!email) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        // let data = await getClassById(id);
        let data = await getClassByEmail(email);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
            DT: data.id,
        });
    }
};
module.exports = {
    getAllClasss,
    createClass,
    getClass,
    updateClass,
    deleteClass,
};
