const express = require("express");
const routerHomePage = express.Router();
const {
  getHomePage,
  getFoodData,
  pushToDataBase,
  postSendToDataBase,
} = require("../controllers/foodData");

routerHomePage.get("/", getHomePage);
routerHomePage.post("/", getFoodData);
routerHomePage.get("/data", (req, res) => {
  pushToDataBase();
  res.redirect("/homepage");
});
routerHomePage.post("/data", postSendToDataBase);

module.exports = routerHomePage;
