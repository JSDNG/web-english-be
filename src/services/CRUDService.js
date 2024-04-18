const connection = require("../config/database");

const getAllAccount = async () => {
    let [results, fields] = await connection.query("SELECT * from account");
    return results;
};

const getAccountById = async (id) => {
    let [results, fields] = await connection.query("SELECT * from account where id = ?", [id]);
    let account = results && results.length > 0 ? results[0] : {};
    return account;
};

const createAccount = async (email, password) => {
    let [results, fields] = await connection.query(
        `INSERT INTO
    account (email, password)
    VALUES (?, ?) `,
        [email, password]
    );
};
const updateAccountById = async (password, id) => {
    let [results, fields] = await connection.query(
        `UPDATE account
        SET password = ?
        WHERE id = ?`,
        [password, id]
    );
};

const deleteAccountById = async (id) => {
    await connection.query(`DELETE FROM account WHERE id = ?`, [id]);
};
module.exports = {
    getAllAccount,
    getAccountById,
    createAccount,
    updateAccountById,
    deleteAccountById,
};
