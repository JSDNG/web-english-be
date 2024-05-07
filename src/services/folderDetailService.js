const db = require("../models");

const createNewFolderDetail = async (rawData) => {
    try {
        let data = await db.FolderDetail.create({
            folderId: rawData.folderId,
            studySetId: studySetId,
        });
        return {
            EC: 0,
            EM: "FolderDetail created successfully",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
        };
    }
};
const deleteFolderDetailById = async (id) => {
    try {
        await db.FolderDetail.destroy({
            where: {
                id: id,
            },
        });
        return {
            EC: 0,
            EM: "OK",
            DT: "",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
            DT: "",
        };
    }
};

module.exports = {
    createNewFolderDetail,
    deleteFolderDetailById,
};
