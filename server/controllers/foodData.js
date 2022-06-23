const { read } = require("fs");
const path = require("path");
const axios = require("axios").default;
const { getConnectedUser, getUserId } = require("./users");
const {
  pushDataToDatabase,
  getProperty,
  deleteFromHistory,
} = require("../../database/usersAuth");

const searches = [];

const getHomePage = (req, res) => {
  if (!getConnectedUser()) {
    res.status(405);
    res.redirect("/users/login");
    return;
  }
  res.render("../views/homepage.ejs", { data: null, searches });
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

  searches.push(data.foods[0]);

  //Render to user
  res.render("../views/homepage.ejs", {
    // data: data.foods[0],
    searches,
  });
};

const pushToDataBase = (req, res) => {
  searches.forEach((item) => {
    const {
      food_name,
      nf_calories,
      serving_weight_grams,
      nf_total_carbohydrate,
      nf_protein,
    } = item;
    pushDataToDatabase(
      {
        user_id: getUserId(),
        food_name,
        nf_calories,
        nf_protein: parseInt(nf_protein),
        serving_weight_grams,
        nf_total_carbohydrate: parseInt(nf_total_carbohydrate),
        photo_thumb: item.photo.thumb,
      },
      "foods"
    );
  });
};

const getHistory = async (req, res) => {
  // /Display all food from DB
  if (!getUserId()) return res.redirect("/users/login");
  const displayAllFoodFromDB = await getProperty(
    "*",
    { user_id: getUserId() },
    "foods"
  );
  res.render("../views/history.ejs", { displayAllFoodFromDB });
};

const deleteHistory = (req, res) => {
  console.log(getUserId());
  deleteFromHistory({ user_id: getUserId() }, "foods").then((res) =>
    console.log(res)
  );
};

module.exports = {
  getHomePage,
  getFoodData,
  pushToDataBase,
  getHistory,
  deleteHistory,
};
