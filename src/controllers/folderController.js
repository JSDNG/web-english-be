const {
    getAllFolder,
    getFolderByPage,
    getFolderById,
    createNewFolder,
    updateFolderById,
    deleteFolderById,
} = require("../services/folderService");
const { deleteFolderDetailByFolderId } = require("../services/folderDetailService");
const createFolder = async (req, res) => {
    try {
        if (!req.body.folderName || !req.body.userId || !req.body.classId) {
            return res.status(200).json({
                EC: 1,
                EM: "Missing required parameters",
                DT: "",
            });
        }
        let data = await createNewFolder(req.body);
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

const getAllFolders = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await getFolderByPage(+page, +limit);
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT,
            });
        } else {
            let data = await getAllFolder();
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
const updateFolder = async (req, res) => {
    try {
        if (!req.body.id || !req.body.folderName || !req.body.classId) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await updateFolderById(req.body);
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

const deleteFolder = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data1 = await deleteFolderDetailByFolderId(id);
            let data = await deleteFolderById(id);
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

const getFolder = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await getFolderById(id);
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
    getAllFolders,
    createFolder,
    getFolder,
    updateFolder,
    deleteFolder,
};
