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
const updateFolderDetailById = async (rawData) => {
    await db.FolderDetail.update(
        {
            folderId: rawData.folderId,
            studySetId: rawData.studySetId,
        },
        {
            where: { id: rawData.id },
        }
    );
};

module.exports = {
    createNewFolderDetail,
    updateFolderDetailById,
};
