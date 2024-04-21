const {
    getAllGroup,
    getGroupById,
    createNewGroup,
    updateGroupById,
    deleteGroupById,
} = require("../services/groupService");

const createGroup = async (req, res) => {
    let { name, description } = req.body;
    if (!name || !description) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await createNewGroup(name, description);
        res.status(200).json({
            EC: 0,
            EM: "Create Group",
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
    let { id, password } = req.body;
    if (!id || !password) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await updateGroupById(password, id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
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
