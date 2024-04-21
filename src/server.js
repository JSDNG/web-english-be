require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
// const initWebRoutes = require("./routes/web");
const initAPIRoutesAccount = require("./routes/accountRouter");
const initAPIRoutesRole = require("./routes/roleRouter");
const initAPIRoutesGroup = require("./routes/groupRouter");
const initAPIRoutesGroupRole = require("./routes/groupRoleRouter");
const initAPIRoutesUser = require("./routes/userRouter");
const app = express(); // app express
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;
const db = require("./models");
const initAPIRoutes = require("./routes/accountRouter");
//config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

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
// run server
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
});
