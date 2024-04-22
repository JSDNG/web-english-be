require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
// const initWebRoutes = require("./routes/web");
const initAPIRoutesAccount = require("./routes/accountRouter");
const initAPIRoutesRole = require("./routes/roleRouter");
const initAPIRoutesGroup = require("./routes/groupRouter");
const initAPIRoutesGroupRole = require("./routes/groupRoleRouter");
const initAPIRoutesUser = require("./routes/userRouter");
const initAPIRoutesStudySet = require("./routes/studySetRouter");
const initAPIRoutesCard = require("./routes/cardRouter");
const app = express(); // app express
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
const db = require("./models");

//config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// Add headers before the router are defined
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-with, content-type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
// config template engine
configViewEngine(app);

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
initAPIRoutesRole(app);
initAPIRoutesGroup(app);
initAPIRoutesGroupRole(app);
initAPIRoutesUser(app);
initAPIRoutesStudySet(app);
initAPIRoutesCard(app);
// run server
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
});
