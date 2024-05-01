const db = require("../models");

const createNewMember = async (rawData) => {
    try {
        await db.Member.create({
            userId: rawData.userId,
            classId: rawData.classId,
        });
        return {
            EC: 0,
            EM: "Member created successfully",
        };
    } catch (err) {
        return {
            EC: -1,
            EM: "Somthin wrongs in service... ",
        };
    }
};

const deleteMemberById = async (id) => {
    try {
        await db.Member.destroy({
            where: {
                id: id,
            },
        });
        return {
            EC: 0,
            EM: "Deleted",
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
    createNewMember,
    deleteMemberById,
};
