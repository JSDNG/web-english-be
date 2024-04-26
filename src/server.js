require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
const configCors = require("./config/cors");
const app = express(); // app express
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
const db = require("./models");

// const initWebRoutes = require("./routes/web");
const initAPIRoutesAccount = require("./routes/accountRouter");
const initAPIRoutesRole = require("./routes/roleRouter");
const initAPIRoutesGroup = require("./routes/groupRouter");
const initAPIRoutesGroupRole = require("./routes/groupRoleRouter");
const initAPIRoutesUser = require("./routes/userRouter");
const initAPIRoutesStudySet = require("./routes/studySetRouter");
const initAPIRoutesCard = require("./routes/cardRouter");
const initAPIRoutesClass = require("./routes/classRouter");
const initAPIRoutesMember = require("./routes/memberRouter");

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
initAPIRoutesRole(app);
initAPIRoutesGroup(app);
initAPIRoutesGroupRole(app);
initAPIRoutesUser(app);
initAPIRoutesStudySet(app);
initAPIRoutesCard(app);
initAPIRoutesClass(app);
initAPIRoutesMember(app);
// run server
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
});
