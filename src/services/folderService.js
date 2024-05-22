const db = require("../models");

const checkFolder = async (id) => {
    let folder = await db.Folder.findOne({
        where: { id: id },
    });
    if (folder) {
        return true;
    }
    return false;
};
const createNewFolder = async (rawData) => {
    try {
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
        const { rows: data } = await db.Folder.findAndCountAll({
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

        if (!data.length > 0) {
            return {
                EC: 0,
                EM: "Get all Folder",
                DT: "",
            };
        }
        // Sắp xếp data theo createDate giảm dần
        data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        for (let j = 0; j < data.length; j++) {
            const folder = data[j];
            let userInfo = await db.User.findByPk(folder.userId, { attributes: ["id", "username", "image"] });
            folder.userId = userInfo.get({ plain: true });
        }
        for (let j = 0; j < data.length; j++) {
            const temp = data[j];

            // Chuyển đổi hình ảnh từ BLOB sang Base64
            const imageBuffer = temp.userId.image; // Giả sử hình ảnh được lưu trong trường "image" của bản ghi
            const base64Image = Buffer.from(imageBuffer, "binary").toString("base64");

            // Gán chuỗi Base64 vào trường "image" của bản ghi
            temp.userId.image = base64Image;
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
const getFolderByPage = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.Folder.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: [
                "id",
                "folderName",
                "createDate",
                "userId",
                "classId",
                [
                    db.sequelize.literal("(SELECT COUNT(*) FROM FolderDetail WHERE folderId = Folder.id)"),
                    "studySetCount",
                ],
            ],
            include: { model: db.StudySet, attributes: [], through: { attributes: [] } },

            raw: true,
            nest: true,
            group: ["Folder.id"],
        });

        if (!rows.length > 0) {
            return {
                EC: 0,
                EM: "Get all Folder",
                DT: "",
            };
        }
        let uniqueArray = [];

        rows.forEach((obj) => {
            if (!uniqueArray.some((item) => item.id === obj.id)) {
                uniqueArray.push(obj);
            }
        });
        let totalPages = Math.ceil(count.length / limit);
        let results = {
            totalRows: count.length,
            totalPages: totalPages,
            data: uniqueArray,
        };

        // Sắp xếp data theo createDate giảm dần
        results.data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        for (let j = 0; j < results.data.length; j++) {
            const folder = results.data[j];
            let userInfo = await db.User.findByPk(folder.userId, { attributes: ["id", "username", "image"] });
            folder.userId = userInfo.get({ plain: true });
        }
        for (let j = 0; j < results.data.length; j++) {
            const temp = results.data[j];

            // Chuyển đổi hình ảnh từ BLOB sang Base64
            const imageBuffer = temp.userId.image; // Giả sử hình ảnh được lưu trong trường "image" của bản ghi
            const base64Image = Buffer.from(imageBuffer, "binary").toString("base64");

            // Gán chuỗi Base64 vào trường "image" của bản ghi
            temp.userId.image = base64Image;
        }
        return {
            EC: 0,
            EM: "Get all Folder",
            DT: results,
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
        let isFolder = await checkFolder(id);
        if (!isFolder) {
            return {
                EC: 1,
                EM: "Folder doesn't already exist",
                DT: "",
            };
        }
        let data = await db.Folder.findOne({
            where: { id: id },
            include: { model: db.StudySet, attributes: ["id", "studySetName", "userId"], through: { attributes: [] } },
            attributes: ["id", "folderName", "createDate", "userId", "classId"],
        });
        //let data = results && results.length > 0 ? results : {};

        let userInfo = await db.User.findByPk(data.userId, { attributes: ["id", "username", "image"] });
        data.userId = userInfo.get({ plain: true });

        // Chuyển đổi hình ảnh từ BLOB sang Base64
        const imageBuffer = data.userId.image; // Giả sử hình ảnh được lưu trong trường "image" của bản ghi
        const base64Image = Buffer.from(imageBuffer, "binary").toString("base64");
        data.userId.image = base64Image;
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
        let isFolder = await checkFolder(id);
        if (!isFolder) {
            return {
                EC: 1,
                EM: "Folder doesn't already exist",
                DT: "",
            };
        }
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

const deleteFolderById = async (id) => {
    try {
        let isFolder = await checkFolder(id);
        if (!isFolder) {
            return {
                EC: 1,
                EM: "Folder doesn't already exist",
                DT: "",
            };
        }
        await db.Folder.destroy({
            where: {
                id: id,
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
    getFolderByPage,
    getFolderById,
    createNewFolder,
    updateFolderById,
    deleteFolderById,
};
