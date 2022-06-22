const { read } = require("fs");
const path = require("path");
const axios = require("axios").default;

const getHomePage = (req, res) => {
  res.render("../views/homepage.ejs", { data: null });
};

const getFoodData = async (req, res) => {
  const { searchFood, grams } = req.body;
  const { data } = await axios({
    method: "post",
    url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
    data: {
      query: `${searchFood} ${grams} grams`,
    },
    headers: {
      "Content-Type": "application/json",
      "x-app-id": "a107cf34",
      "x-app-key": "32d7bcf14e2ddab57b25974ee868d5a1",
      "x-remote-user-id": "0",
    },
  });
  // res.json(data.foods[0]);
  res.render("../views/homepage.ejs", { data: data.foods[0] });
};
module.exports = { getHomePage, getFoodData };