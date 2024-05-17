const db = require("../models");

const createNewFolderDetail = async (rawData) => {
    try {
        let data = await db.FolderDetail.create({
            folderId: rawData.folderId,
            studySetId: rawData.studySetId,
        });
        return {
            EC: 0,
            EM: "FolderDetail created successfully",
        };
    } catch (err) {
        console.log(err);
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
        };
    }
};
const deleteFolderDetailByStudySetId = async (id) => {
    try {
        await db.FolderDetail.destroy({
            where: {
                studySetId: id,
            },
        });
        return {
            EC: 0,
            EM: "FolderDetail deleted successfully",
            DT: "",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};
const deleteFolderDetailByFolderId = async (id) => {
    try {
        await db.FolderDetail.destroy({
            where: {
                folderId: id,
            },
        });
        return {
            EC: 0,
            EM: "FolderDetail deleted successfully",
            DT: "",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};
module.exports = {
    createNewFolderDetail,
    deleteFolderDetailByStudySetId,
    deleteFolderDetailByFolderId,
};
