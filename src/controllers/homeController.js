const connection = require("../config/database");
const {
    getAllAccount,
    getAccountById,
    createAccount,
    updateAccountById,
    deleteAccountById,
} = require("../services/CRUDService");

const getHomePage = async (req, res) => {
    let results = await getAllAccount();
    return res.render("home.ejs", { listAccount: results });
};

const getInfo = (req, res) => {
    res.render("sample.ejs");
};
const postCreateAccount = async (req, res) => {
    let { email, password } = req.body;
    await createAccount(email, password);
    res.redirect("/");
};

const getAccount = async (req, res) => {
    let id = 1;
    await getAccountById(id);
};

const postUpdateAccount = async (req, res) => {
    let { id, password } = req.body;
    await updateAccountById(password, id);
    // console.log(">>>", results);
    res.redirect("/");
};

const postDeleteAccount = async (req, res) => {
    let id = 7;
    await deleteAccountById(id);
    res.redirect("/");
};

module.exports = {
    getHomePage,
    getInfo,
    postCreateAccount,
    getAccount,
    postUpdateAccount,
    postDeleteAccount,
};
