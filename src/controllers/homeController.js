const getHomePage = (req, res) => {
  //process data
  //call model
  res.send("Hello World! & nodemon");
};

const getInfo = (req, res) => {
  res.render("sample.ejs");
};

module.exports = {
  getHomePage,
  getInfo,
};
