const {
    getAllAccount,
    getAccountById,
    registerAccount,
    loginAccount,
    updateAccountById,
} = require("../services/accountService");

const { createNewUser } = require("../services/userService");
const register = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.username) {
            return res.status(200).json({
                EC: 1,
                EM: "Missing required parameters",
                DT: "",
            });
        }

        if (req.body.password.length < 6) {
            return res.status(200).json({
                EC: 1,
                EM: "Your password must have at least 6 characters",
                DT: "",
            });
        }
        console.log(".....");
        let data = await registerAccount(req.body);
        if (data.EC !== 0) {
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
                DT: "",
            });
        }
        let accountId = data.DT && data.DT.toString();

        if (accountId) {
            let data1 = await createNewUser(req.body.username, req.body.groupId, accountId);
            return res.status(200).json({
                EC: data1.EC,
                EM: data1.EM,
                DT: "",
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
const login = async (req, res) => {
    try {
        let data = await loginAccount(req.body);
        // set cookie
        if (data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }

        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT,
        });
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            EC: 0,
            EM: "Logout succeed",
            DT: req.body,
        });
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};
const getAllAccounts = async (req, res) => {
    try {
        let data = await getAllAccount();
        return res.status(200).json({
            EC: data.EC,
            EM: data.EM,
            DT: data.DT,
        });
    } catch (err) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};

const changePassword = async (req, res) => {
    try {
        if (!req.body.current_password || !req.body.new_password) {
            return res.status(200).json({
                EC: 1,
                EM: "missing required params",
                DT: "",
            });
        } else {
            let data = await updateAccountById(req.body);
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

const getAccount = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        let data = await getAccountById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
            DT: data.id,
        });
    }
};
module.exports = {
    getAllAccounts,
    register,
    login,
    logout,
    getAccount,
    changePassword,
};
