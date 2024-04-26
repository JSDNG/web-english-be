const { createNewMember, updateMemberById } = require("../services/memberService");

const createMember = async (req, res) => {
    try {
        if (!req.body.userId || !req.body.classId) {
            return res.status(200).json({
                EC: 1,
                EM: "Missing required parameters",
            });
        }
        let data = await createNewMember(req.body);
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
        });
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};

const updateMember = async (req, res) => {
    let { userId, classId, id } = req.body;
    if (!userId || !classId) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await updateMemberById(userId, classId, id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

module.exports = {
    createMember,
    updateMember,
};
