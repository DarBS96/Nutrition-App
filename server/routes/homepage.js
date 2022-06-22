const express = require("express");
const routerHomePage = express.Router();
const {
  getHomePage,
  getFoodData,
  //   createImage,
} = require("../controllers/foodData");

routerHomePage.get("/", getHomePage);
// routerHomePage.get("/chart", createImage);
routerHomePage.post("/", getFoodData);

module.exports = routerHomePage;
