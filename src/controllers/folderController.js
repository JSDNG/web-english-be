const {
    getAllAccount,
    getAccountById,
    createNewAccount,
    updateAccountById,
    deleteAccountById,
} = require("../services/accountService");

const { createNewUser } = require("../services/userService");
const register = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.username) {
            return res.status(200).json({
                EC: 1,
                EM: "Missing required parameters",
            });
        }

        if (req.body.password.length < 6) {
            return res.status(200).json({
                EC: 1,
                EM: "Your password must have at least 6 characters",
            });
        }
        console.log(".....");
        let data = await createNewAccount(req.body);
        if (data.EC === 1) {
            return res.status(200).json({
                EC: data.EC,
                EM: data.EM,
            });
        }
        let accountId = data.DT && data.DT.toString();

        if (accountId) {
            let data1 = await createNewUser(req.body.username, req.body.groupId, accountId);
            return res.status(200).json({
                EC: data1.EC,
                EM: data1.EM,
            });
        }
    } catch (e) {
        res.status(500).json({
            EC: -1,
            EM: "error from server",
            DT: "",
        });
    }
};

const getAllAccounts = async (req, res) => {
    let results = await getAllAccount();

    return res.status(200).json({
        EC: 0,
        EM: "ok",
        DT: results,
    });
};

const updateAccount = async (req, res) => {
    let { id, password } = req.body;
    if (!id || !password) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await updateAccountById(password, id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const deleteAccount = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await deleteAccountById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const getAccount = async (req, res) => {
    let email = req.body.email;
    console.log(">>>", req.body.email);
    if (!email) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        // let data = await getAccountById(id);
        let data = await getAccountByEmail(email);
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
    getAccount,
    updateAccount,
    deleteAccount,
};
