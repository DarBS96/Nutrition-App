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
const { getConnectedUsers } = require("../controllers/users");

const verify = (req, res, next) => {
  try {
    if (req.cookies.data) {
      const userObj = JSON.parse(req.cookies.data);
      const username = getConnectedUsers().find(
        (user) => user.token === userObj.token
      );
      req.connectedUser = username.username;
      req.connectedUserId = getConnectedUsers().find(
        (user) => user.token === userObj.token
      ).userId;
      next();
      return;
    }
    res.redirect("/users/login");
  } catch (err) {
    res.redirect("/users/login");
  }
};

routerHomePage.get("/", verify, getHomePage);
routerHomePage.post("/", verify, getFoodData);
routerHomePage.post("/data", verify, pushToDataBase);
routerHomePage.get("/history", verify, getHistory);
routerHomePage.get("/delete", verify, deleteAllHistory);
routerHomePage.post("/delete", verify, deleteClickedCard);

module.exports = { routerHomePage, verify };
