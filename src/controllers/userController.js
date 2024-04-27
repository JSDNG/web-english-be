const { getAllUser, getUserById, updateUserById, getUsersByPage } = require("../services/userService");

const updateUser = async (req, res) => {
    if (!req.body.id || !req.body.username || !req.body.image) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        let data = await updateUserById(req.body);
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
        });
    }
};

const getUser = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
            });
        } else {
            let data = await getUserById(id);
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT,
            });
        }
    } catch (e) {
        return res.status(500).json({
            EC: 1,
            EM: "err",
            DT: "",
        });
    }
};

const getUsers = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await getUsersByPage(+page, +limit);
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT,
            });
        } else {
            let data = await getAllUser();
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: data.DT,
            });
        }
    } catch (e) {
        return res.status(500).json({
            EC: 1,
            EM: "err",
            DT: "",
        });
    }
};
module.exports = {
    getUser,
    updateUser,
    getUsers,
};
