require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
// const initWebRoutes = require("./routes/web");
const initAPIRoutes = require("./routes/api");
const app = express(); // app express
const port = process.env.PORT || 8888; // port => hardcode
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// config template engine
configViewEngine(app);

// khai bao route
initAPIRoutes(app);

// run server
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
});
