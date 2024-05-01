const { createNewFolderDetail, updateFolderDetailById } = require("../services/folderDetailService");

const createFolderDetail = async (req, res) => {
    try {
        if (!req.body.folderId || !req.body.studySetId) {
            return res.status(200).json({
                EC: 1,
                EM: "Missing required parameters",
            });
        } else {
            let data = await createNewFolderDetail(req.body);
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
            });
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};

const updateFolderDetail = async (req, res) => {
    if (!req.body.folderId || !req.body.studySetId) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await updateFolderDetailById(req.body);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

module.exports = {
    createFolderDetail,
    updateFolderDetail,
};
