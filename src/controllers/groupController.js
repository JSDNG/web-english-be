const {
    getAllGroup,
    getGroupById,
    createNewGroup,
    updateGroupById,
    deleteGroupById,
} = require("../services/groupService");

const createGroup = async (req, res) => {
    try {
        if (!req.body.name || !req.body.description) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
            });
        } else {
            let data = await createNewGroup(req.body);
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

const getAllGroups = async (req, res) => {
    let results = await getAllGroup();
    return res.status(200).json({
        EC: 0,
        EM: "ok",
        DT: results,
    });
};

const updateGroup = async (req, res) => {
    try {
        if (!req.body.name || !req.body.description || !req.body.id) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
            });
        } else {
            let data = await updateGroupById(req.body);
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

const deleteGroup = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await deleteGroupById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const getGroup = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        let data = await getGroupById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
            DT: data,
        });
    }
};
module.exports = {
    getAllGroups,
    createGroup,
    getGroup,
    updateGroup,
    deleteGroup,
};
