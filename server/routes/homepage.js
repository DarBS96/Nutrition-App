const express = require("express");
const routerHomePage = express.Router();
const {
  getHomePage,
  getFoodData,
  pushToDataBase,
  getHistory,
  deleteHistory,
} = require("../controllers/foodData");

routerHomePage.get("/", getHomePage);
routerHomePage.post("/", getFoodData);
routerHomePage.post("/data", pushToDataBase);
routerHomePage.get("/history", getHistory);
routerHomePage.post("/delete", deleteHistory);

module.exports = routerHomePage;
