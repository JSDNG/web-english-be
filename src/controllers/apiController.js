const {
    getAllAccount,
    getAccountById,
    createNewAccount,
    updateAccountById,
    deleteAccountById,
} = require("../services/CRUDService");

const createAccount = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    }
    await createNewAccount(email, password);
    res.status(200).json({
        EC: 0,
        EM: "Create account success",
    });
};

const getAllAccounts = async (req, res) => {
    let results = await getAllAccount();
    return res.status(200).json({
        message: "ok",
        data: results,
    });
};

const updateAccount = async (req, res) => {
    let { id, email, password } = req.body;
    if (!id || !password || !email) {
        return res.status(200).json({
            message: "missing required params",
        });
    }
    await updateAccountById(email, password, id);
    return res.status(200).json({
        message: "ok",
    });
};

const deleteAccount = async (req, res) => {
    let id = req.body;
    if (!id) {
        return res.status(200).json({
            message: "missing required params",
        });
    }
    await deleteAccountById(id);
    return res.status(200).json({
        message: "ok",
    });
};
const getInfo = (req, res) => {
    return res.status(200).json({
        message: "0k",
    });
};

const getAccount = async (req, res) => {
    let id = 1;
    await getAccountById(id);
};
module.exports = {
    getAllAccounts,
    getInfo,
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount,
};
