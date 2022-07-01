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
      req.connectedUser = getConnectedUsers().find(
        (user) => user.token === userObj.token
      ).username;
      req.connectedUserId = getConnectedUsers().find(
        (user) => user.token === userObj.token
      ).userId;
      console.log(
        "username: ",
        req.connectedUser,
        "user_id: ",
        req.connectedUserId
      );
      next();
      return;
    }
    res.send(
      "<h1>There was an authentication problem! Please log in again!</h1>"
    );
  } catch (err) {
    res.redirect("/users/login");
    console.log(err);
  }
};

routerHomePage.get("/", verify, getHomePage);
routerHomePage.post("/", verify, getFoodData);
routerHomePage.post("/data", verify, pushToDataBase);
routerHomePage.get("/history", verify, getHistory);
routerHomePage.get("/delete", verify, deleteAllHistory);
routerHomePage.post("/delete", verify, deleteClickedCard);

module.exports = { routerHomePage, verify };
