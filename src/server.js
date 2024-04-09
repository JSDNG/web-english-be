require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");

const app = express(); // app express
const port = process.env.PORT || 8888; // port => hardcode
const hostname = process.env.HOST_NAME;

const mysql = require("mysql2");
// config template engine
configViewEngine(app);

// khai bao route
app.use("/", webRoutes);

// test connection
// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "123456",
    database: "huongdichvu",
});

// simple query
connection.query("SELECT * FROM Users", function (err, results, fields) {
    console.log(results);
});

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
});
