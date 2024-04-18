const connection = require("../config/database");

const getHomePage = (req, res) => {
    return res.render("home.ejs");
};

const getInfo = (req, res) => {
    res.render("sample.ejs");
};
const postCreateAccount = (req, res) => {
    let { email, password } = req.body;
    connection.query(
        `INSERT INTO
    account (email, password)
    VALUES (?, ?) `,
        [email, password],
        function (err, results) {
            console.log(results);
            res.send(" create account succeed !");
        }
    );
};
module.exports = {
    getHomePage,
    getInfo,
    postCreateAccount,
};
