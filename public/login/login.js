// "use strict";

// let params = {
//   api_key: "Huebu1auQcd7D7y9JdP4GjDw9UcnmjGpgmmDFgaw",
//   query: "cheese",
//   pageSize: 1,
// };

// const apiURL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${params.api_key}&query=${params.query}&pageSize=${params.pageSize}`;
// console.log(apiURL);
// const getFoodData = async () => {
//   try {
//     const res = await fetch(apiURL);
//     const data = await res.json();
//     // console.log(data);
//     console.log(data.foods[0].foodNutrients);
//   } catch (error) {
//     console.log(error);
//   }
// };

// getFoodData();

const login = () => {
  //view
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const options = {
    method: "POST",
    Headers: {
      "Content-Type": "application/json",
    },
    body: {},
  };
};
