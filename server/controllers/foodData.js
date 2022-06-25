const path = require("path");
const axios = require("axios").default;
const { getConnectedUser, getUserId, getSearches } = require("./users");
const {
  pushDataToDatabase,
  getProperty,
  deleteFromHistory,
} = require("../../database/usersAuth");

const getHomePage = (req, res) => {
  if (!getConnectedUser()) {
    res.status(405);
    res.redirect("/users/login");
    return;
  }
  res.render("../views/homepage.ejs", {
    data: null,
    searches: getSearches(),
    connectedUser: getConnectedUser(),
  });
};

const getFoodData = async (req, res) => {
  try {
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

    //make an array of results and show it to user
    getSearches().push(data.foods[0]);

    res.render("../views/homepage.ejs", {
      searches: getSearches(),
      connectedUser: getConnectedUser(),
    });
  } catch (err) {
    res.send(err.message);
    return;
  }
};

const pushToDataBase = (req, res) => {
  const { idx } = req.body;
  //Push card when clicked to DB
  const {
    food_name,
    nf_calories,
    serving_weight_grams,
    nf_total_carbohydrate,
    nf_protein,
  } = getSearches()[idx];
  pushDataToDatabase(
    {
      user_id: getUserId(),
      food_name,
      nf_calories: parseInt(nf_calories),
      nf_protein: parseInt(nf_protein),
      serving_weight_grams: parseInt(serving_weight_grams),
      nf_total_carbohydrate: parseInt(nf_total_carbohydrate),
      photo_thumb: getSearches()[idx].photo.thumb,
    },
    "foods"
  );
};

const getHistory = async (req, res) => {
  // /Display all food from DB
  if (!getUserId()) return res.redirect("/users/login");
  const displayAllFoodFromDB = await getProperty(
    "*",
    { user_id: getUserId() },
    "foods"
  );
  res.render("../views/history.ejs", {
    displayAllFoodFromDB,
    connectedUser: getConnectedUser(),
  });
};

const deleteAllHistory = (req, res) => {
  deleteFromHistory({ user_id: getUserId() }, "foods").then(res);
};

const deleteClickedCard = async (req, res) => {
  const { idx } = req.body;
  const displayAllFoodFromDB = await getProperty(
    "*",
    { user_id: getUserId() },
    "foods"
  );

  deleteFromHistory(
    { food_id: displayAllFoodFromDB[idx].food_id },
    "foods"
  ).then(res);
};

module.exports = {
  getHomePage,
  getFoodData,
  pushToDataBase,
  getHistory,
  deleteAllHistory,
  deleteClickedCard,
};
