const express = require("express");
const routerHomePage = express.Router();
const {
  getHomePage,
  getFoodData,
  pushToDataBase,
} = require("../controllers/foodData");

routerHomePage.get("/", getHomePage);
routerHomePage.post("/", getFoodData);
routerHomePage.get("/data", (req, res) => {
  pushToDataBase();
  res.redirect("/homepage");
});
routerHomePage.post("/data", (req, res) => {
  console.log(req.body);
});

module.exports = routerHomePage;
