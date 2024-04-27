require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
const configCors = require("./config/cors");
const app = express(); // app express
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
const db = require("./models");

// const initWebRoutes = require("./routes/web");
const initAPIRoutesAccount = require("./routes/apiRouter");

//config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// config template engine
configViewEngine(app);

// config cors
configCors(app);
db.sequelize
    .sync()
    .then(() => {
        console.log("Synced database.");
    })
    .catch((err) => {
        console.log("Failed to sync database: " + err.message);
    });

// khai bao route
initAPIRoutesAccount(app);

// run server
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
});
