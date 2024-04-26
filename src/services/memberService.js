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

const updateMemberById = async (userId, classId, id) => {
    await db.Member.update(
        {
            userId: userId,
            classId: classId,
        },
        {
            where: { id: id },
        }
    );
};

module.exports = {
    createNewMember,
    updateMemberById,
};
