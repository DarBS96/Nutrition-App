const { calculateRmr, getBMI } = require("../modules/rmr.js");
const {
  pushDataToDatabase,
  getProperty,
  checkIfExist,
} = require("../../database/usersAuth");

const getRmr = async (req, res) => {
  if (!req.connectedUser) {
    res.redirect("/users/login");
    return;
  }
  if (!(await checkIfExist({ user_id: req.connectedUserId }, "userInfo"))) {
    res.render("../views/rmr.ejs", {
      form: true,
      connectedUser: req.connectedUser,
    });
    return;
  }
  const rmr = (
    await getProperty("RMR", { user_id: req.connectedUserId }, "userInfo")
  )[0].RMR;
  const bmi = (
    await getProperty("BMI", { user_id: req.connectedUserId }, "userInfo")
  )[0].BMI;
  res.render("../views/rmr.ejs", {
    rmr,
    bmi,
    form: false,
    connectedUser: req.connectedUser,
  });
};

const postRmr = async (req, res) => {
  if (!(await checkIfExist({ user_id: req.connectedUserId }, "userInfo"))) {
    const rmr = calculateRmr(req.body);
    const bmi = getBMI(req.body);
    const userInfo = {
      ...req.body,
      RMR: rmr,
      user_id: req.connectedUserId,
      BMI: Number(bmi),
    };
    pushDataToDatabase(userInfo, "userInfo");
    res.render("../views/rmr.ejs", {
      rmr,
      bmi,
      form: false,
      connectedUser: req.connectedUser,
    });
    return;
  }
};

module.exports = { getRmr, postRmr };
