const { calculateRmr, getChart } = require("../modules/rmr.js");
const { pushDataToDatabase, getProperty } = require("../../database/usersAuth");
const { connectedUser } = require("./users");

const getRmr = (req, res) => {
  res.render("../views/rmr.ejs");
};

const postRmr = async (req, res) => {
  const rmr = calculateRmr(req.body);
  const userId = await getProperty("user_id", { username: "or101" }, "users");
  const userInfo = { ...req.body, RMR: rmr, user_id: userId[0].user_id };
  pushDataToDatabase(userInfo, "userInfo");
  res.render("../views/rmr.ejs", { rmr });
  // getChart().then((img) => {
  //   res.render("../views/rmr.ejs", { rmr, img });
  // });
};

module.exports = { getRmr, postRmr };
