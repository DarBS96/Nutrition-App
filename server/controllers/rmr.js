const { calculateRmr, getBMI } = require("../modules/rmr.js");
const {
  pushDataToDatabase,
  getProperty,
  checkIfExist,
} = require("../../database/usersAuth");
const { getConnectedUser, getUserId } = require("./users");

const getRmr = async (req, res) => {
  if (!getConnectedUser()) {
    res.redirect("/users/login");
    return;
  }
  if (!(await checkIfExist({ user_id: getUserId() }, "userInfo"))) {
    res.render("../views/rmr.ejs", {
      form: true,
      connectedUser: getConnectedUser(),
    });
    return;
  }
  const rmr = (
    await getProperty("RMR", { user_id: getUserId() }, "userInfo")
  )[0].RMR;
  const bmi = (
    await getProperty("BMI", { user_id: getUserId() }, "userInfo")
  )[0].BMI;
  res.render("../views/rmr.ejs", {
    rmr,
    bmi,
    form: false,
    connectedUser: getConnectedUser(),
  });
};

const postRmr = async (req, res) => {
  if (!(await checkIfExist({ user_id: getUserId() }, "userInfo"))) {
    const rmr = calculateRmr(req.body);
    const bmi = getBMI(req.body);
    const userInfo = {
      ...req.body,
      RMR: rmr,
      user_id: getUserId(),
      BMI: Number(bmi),
    };
    pushDataToDatabase(userInfo, "userInfo");
    res.render("../views/rmr.ejs", {
      rmr,
      bmi,
      form: false,
      connectedUser: getConnectedUser(),
    });
    return;
  }
};

module.exports = { getRmr, postRmr };
