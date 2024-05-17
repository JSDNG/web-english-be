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
            EM: "Something wrongs in service... ",
        };
    }
};

const deleteMemberByClassId = async (id) => {
    try {
        await db.Member.destroy({
            where: {
                classId: id,
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
            EM: "Something wrongs in service... ",
            DT: "",
        };
    }
};

const deleteMemberByUserId = async (id) => {
    try {
        await db.Member.destroy({
            where: {
                userId: id,
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
            EM: "Something wrongs in service... ",
            DT: "",
        };
    }
};

module.exports = {
    createNewMember,
    deleteMemberByClassId,
    deleteMemberByUserId,
};
