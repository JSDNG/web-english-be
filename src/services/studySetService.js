const db = require("../models");

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
            include: { model: db.Card, attributes: [] }, // Không cần lấy attributes của Card, chỉ cần đếm số lượng

            raw: true,
            nest: true,
            group: ["StudySet.id"],
        });

        // Sắp xếp data theo createDate giảm dần
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
        return {
            EC: 0,
            EM: "Get All Study Sets",
            DT: data, // Trả về tổng số study set và danh sách study set kèm theo số card
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

const getStudySetById = async (id) => {
    try {
        let data = await db.StudySet.findOne({
            where: { id: id },
            include: { model: db.Card, attributes: ["id", "term", "definition"] },
            attributes: ["id", "studySetName", "userId"],
        });
        //let data = results && results.length > 0 ? results : {};

        let userInfo = await db.User.findByPk(data.userId, { attributes: ["id", "username", "image"] });
        data.userId = userInfo.get({ plain: true });
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
            EM: "Updated",
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

const deleteStudySetById = async (id) => {
    try {
        let data = await db.StudySet.destroy({
            where: {
                id: id,
            },
        });
        return {
            EC: 0,
            EM: "Daleted",
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
    getStudySetById,
    createNewStudySet,
    updateStudySetById,
    deleteStudySetById,
};
