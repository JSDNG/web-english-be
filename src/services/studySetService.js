const db = require("../models");

const checkStudySetId = async (data) => {
    let id = await db.StudySet.findOne({
        where: { id: data },
    });
    if (id) {
        return true;
    }
    return false;
};
const getAllStudySet = async () => {
    try {
        const data = await db.StudySet.findAll({
            attributes: [
                "id",
                "studySetName",
                "createDate",
                "userId",
                [db.sequelize.fn("COUNT", db.sequelize.col("Cards.id")), "cards"],
            ],
            include: { model: db.Card, attributes: [] },

            raw: true,
            nest: true,
            group: ["StudySet.id"],
        });
        if (!data.length > 0) {
            return {
                EC: 0,
                EM: "Get All Study Sets",
                DT: "",
            };
        }
        data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        // // Đếm tổng số card trong mỗi study set và cập nhật rows
        // for (let i = 0; i < data.length; i++) {
        //     const studySet = data[i];
        //     const cardCount = await db.Card.count({ where: { studySetId: studySet.id } });
        //     studySet.cardCount = cardCount; // Thêm thuộc tính cardCount vào mỗi study set
        // }
        for (let j = 0; j < data.length; j++) {
            const studySet = data[j];
            let userInfo = await db.User.findByPk(studySet.userId, { attributes: ["id", "username", "image"] });
            studySet.userId = userInfo.get({ plain: true });
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
            EM: "Get All Study Sets",
            DT: data,
        };
    } catch (err) {
        console.log(err);
        return {
            EC: -1,
            EM: "Somthing wrongs in service... ",
            DT: err,
        };
    }
};
const getSetsByPage = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.StudySet.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: [
                "id",
                "studySetName",
                "createDate",
                "userId",
                //[db.sequelize.fn("COUNT", db.sequelize.col("Cards.id")), "cards"],
                [db.sequelize.literal("(SELECT COUNT(*) FROM Card WHERE studySetId = StudySet.id)"), "cards"],
            ],
            include: { model: db.Card, attributes: [] },

            raw: true,
            nest: true,
            group: ["StudySet.id"],
        });
        if (!rows.length > 0) {
            return {
                EC: 0,
                EM: "Get All Study Sets",
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
        results.data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        // // Đếm tổng số card trong mỗi study set và cập nhật rows
        // for (let i = 0; i < data.length; i++) {
        //     const studySet = data[i];
        //     const cardCount = await db.Card.count({ where: { studySetId: studySet.id } });
        //     studySet.cardCount = cardCount; // Thêm thuộc tính cardCount vào mỗi study set
        // }
        for (let j = 0; j < results.data.length; j++) {
            const studySet = results.data[j];
            let userInfo = await db.User.findByPk(studySet.userId, { attributes: ["id", "username", "image"] });
            studySet.userId = userInfo.get({ plain: true });
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
            EM: "Get All Study Sets",
            DT: results,
        };
    } catch (err) {
        console.log(err);
        return {
            EC: -1,
            EM: "Somthing wrongs in service... ",
            DT: "",
        };
    }
};
const getStudySetById = async (id) => {
    try {
        let isSet = await checkStudySetId(id);
        if (!isSet) {
            return {
                EC: 1,
                EM: "Study Set doesn't already exist",
                DT: "",
            };
        }
        let data = await db.StudySet.findOne({
            where: { id: id },
            include: { model: db.Card, attributes: ["id", "term", "definition"] },
            attributes: ["id", "studySetName", "userId"],
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
            EM: "Get one study set",
            DT: data.get({ plain: true }),
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthing wrongs in service... ",
            DT: "",
        };
    }
};

const createNewStudySet = async (rawData) => {
    try {
        let data = await db.StudySet.create({
            studySetName: rawData.studySetName,
            createDate: Date.now(),
            userId: rawData.userId,
        });
        return {
            EC: 0,
            EM: "Create Study Set",
            DT: data.id,
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthing wrongs in service... ",
            DT: "",
        };
    }
};
const updateStudySetById = async (rawData) => {
    try {
        let isSet = await checkStudySetId(rawData.id);
        if (!isSet) {
            return {
                EC: 1,
                EM: "Study Set doesn't already exist",
                DT: "",
            };
        }
        let data = await db.StudySet.update(
            {
                studySetName: rawData.studySetName,
            },
            {
                where: { id: rawData.id },
            }
        );
        return {
            EC: 0,
            EM: "Updated Study Set",
            DT: "",
        };
    } catch (err) {
        console.log(err);
        return {
            EC: -1,
            EM: "Somthing wrongs in service... ",
            DT: "",
        };
    }
};

const deleteStudySetById = async (id) => {
    try {
        let isSet = await checkStudySetId(id);
        if (!isSet) {
            return {
                EC: 1,
                EM: "Study Set doesn't already exist",
                DT: "",
            };
        }
        let data = await db.StudySet.destroy({
            where: {
                id: id,
            },
        });
        return {
            EC: 0,
            EM: "Deleted Study Set",
            DT: "",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthing wrongs in service... ",
            DT: "",
        };
    }
};
module.exports = {
    getAllStudySet,
    getSetsByPage,
    getStudySetById,
    createNewStudySet,
    updateStudySetById,
    deleteStudySetById,
};
