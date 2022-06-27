const express = require("express");
const routerHomePage = express.Router();
const {
  getHomePage,
  getFoodData,
  pushToDataBase,
  getHistory,
  deleteAllHistory,
  deleteClickedCard,
} = require("../controllers/foodData");

routerHomePage.get("/", getHomePage);
routerHomePage.post("/", getFoodData);
routerHomePage.post("/data", pushToDataBase);
routerHomePage.get("/history", getHistory);
routerHomePage.get("/delete", deleteAllHistory);
routerHomePage.post("/delete", deleteClickedCard);

module.exports = routerHomePage;
