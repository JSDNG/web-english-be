const db = require("../models");

const createNewFolder = async (rawData) => {
    try {
        if (rawData.classId) {
            let data = await db.Folder.create({
                folderName: rawData.folderName,
                userId: rawData.userId,
                classId: rawData.classId,
            });
            return {
                EC: 0,
                EM: "Folder created successfully",
                DT: "",
            };
        } else {
            let data = await db.Folder.create({
                folderName: rawData.folderName,
                userId: rawData.userId,
            });
            return {
                EC: 0,
                EM: "Folder created successfully",
                DT: "",
            };
        }
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
            DT: "",
        };
    }
};
const getAllFolder = async () => {
    try {
        let results = await db.Folder.findAll();
        let data = results && results.length > 0 ? results : {};
        return {
            EC: 0,
            EM: "",
            DT: data,
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
            DT: "",
        };
    }
};

const getFolderById = async (rawData) => {
    try {
        let results = await db.Folder.findByPk(rawData);
        let data = results && results.length > 0 ? results : {};
        return {
            EC: 0,
            EM: "Get folder",
            DT: data.get({ plain: true }),
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
            DT: "",
        };
    }
};

const updateFolderById = async (rawData) => {
    try {
        // check rawData.userId
        if (rawData.classId) {
            await db.Folder.update(
                {
                    folderName: rawData.folderName,
                    classId: rawData.classId,
                },
                {
                    where: { id: rawData.id },
                }
            );
            return {
                EC: 0,
                EM: "Folder updated successfully",
            };
        } else {
            let data = await db.Folder.update(
                {
                    folderName: rawData.folderName,
                    userId: rawData.userId,
                },
                {
                    where: { id: rawData.id },
                }
            );
            return {
                EC: 0,
                EM: "Folder updated successfully",
            };
        }
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
        };
    }
};

const deleteFolderById = async (rawData) => {
    try {
        await db.Folder.destroy({
            where: {
                id: rawData,
            },
        });
        return {
            EC: 0,
            EM: "Folder deleted successfully",
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
    getAllFolder,
    getFolderById,
    createNewFolder,
    updateFolderById,
    deleteFolderById,
};
