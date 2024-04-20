const {
    getAllAccount,
    getAccountById,
    createNewAccount,
    updateAccountById,
    deleteAccountById,
} = require("../services/accountService");

const createAccount = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await createNewAccount(email, password);
        res.status(200).json({
            EC: 0,
            EM: "Create account",
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
            DT: data,
        });
    }
};
module.exports = {
    getAllAccounts,
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount,
};
