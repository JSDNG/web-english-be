const {
    getAllClass,
    getClassByPage,
    getClassById,
    createNewClass,
    updateClassById,
    deleteClassById,
} = require("../services/classService");
const { deleteMemberByClassId } = require("../services/memberService");
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
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await getClassByPage(+page, +limit);
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT,
            });
        } else {
            let data = await getAllClass();
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

const updateClass = async (req, res) => {
    try {
        if (!req.body.className || !req.body.description || req.body.id) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await updateClassById(req.body);
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

const deleteClass = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data1 = await deleteMemberByClassId(id);
            if (data1 && data1.EC === 0) {
                let data = await deleteClassById(id);
                return res.status(200).json({
                    EC: data.EC,
                    EM: data.EM,
                    DT: data.DT,
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

const getClass = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
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
