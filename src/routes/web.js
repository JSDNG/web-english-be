const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //res.send("Hello World! & nodemon");
  res.render("sample.ejs");
});

module.exports = router; // export default
