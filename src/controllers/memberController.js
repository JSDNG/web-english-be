const { createNewMember, deleteMemberByUserId } = require("../services/memberService");

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

const deleteMember = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
            });
        } else {
            let data = await deleteMemberByUserId(req.body.id);
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT,
            });
        }
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};

module.exports = {
    createMember,
    deleteMember,
};
