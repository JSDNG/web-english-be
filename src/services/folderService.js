const db = require("../models");

const createNewFolder = async (rawData) => {
    try {
        if (rawData.classId) {
            let data = await db.Folder.create({
                folderName: rawData.folderName,
                createDate: Date.now(),
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
                createDate: Date.now(),
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
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};
const getAllFolder = async () => {
    try {
        //let results = await db.Folder.findAll();
        // let data = results && results.length > 0 ? results : {};
        const data = await db.Folder.findAll({
            attributes: [
                "id",
                "folderName",
                "createDate",
                "userId",
                "classId",
                [db.sequelize.fn("COUNT", db.sequelize.col("StudySets.id")), "studySetCount"],
            ],
            include: { model: db.StudySet, attributes: [], through: { attributes: [] } },

            raw: true,
            nest: true,
            group: ["Folder.id"],
        });

        // Sắp xếp data theo createDate giảm dần
        data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        for (let j = 0; j < data.length; j++) {
            const folder = data[j];
            let userInfo = await db.User.findByPk(folder.userId, { attributes: ["id", "username", "image"] });
            folder.userId = userInfo.get({ plain: true });
        }
        return {
            EC: 0,
            EM: "Get all Folder",
            DT: data,
        };
    } catch (err) {
        console.log(err);
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
            DT: "",
        };
    }
};

const getFolderById = async (id) => {
    try {
        let data = await db.Folder.findOne({
            where: { id: id },
            include: { model: db.StudySet, attributes: ["id", "studySetName", "userId"], through: { attributes: [] } },
            attributes: ["id", "folderName", "createDate", "userId", "classId"],
        });
        //let data = results && results.length > 0 ? results : {};

        let userInfo = await db.User.findByPk(data.userId, { attributes: ["id", "username", "image"] });
        data.userId = userInfo.get({ plain: true });
        return {
            EC: 0,
            EM: "Get one Folder",
            DT: data.get({ plain: true }),
        };
    } catch (err) {
        console.log(err);
        return {
            EC: -1,
            EM: "Something wrong with the server... ",
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
            EM: "Something wrong with the server... ",
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
            EM: "Something wrong with the server... ",
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
