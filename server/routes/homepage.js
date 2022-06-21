const express = require("express");
const routerHomePage = express.Router();
const { getHomePage, getFoodData } = require("../controllers/foodData");

routerHomePage.get("/", getHomePage);
routerHomePage.post("/", getFoodData);

module.exports = routerHomePage;
