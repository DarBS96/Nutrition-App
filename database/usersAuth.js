const knex = require("knex");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: "5432",
    user: "postgres",
    password: "Or2022",
    database: "nutritionApp",
  },
});

// db.select()
//   .table("users")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// db("users")
//   .insert([
//     {
//       first_name: "Dar",
//       last_name: "Ben Shitrit",
//       email: "dsa@gmail.com",
//       username: "OrHachamod",
//       password: "123456",
//     },
//   ])
//   .returning("*")
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const checkIfExist = (keyValueObj, table) => {
  const isExist = db(table)
    .select("*")
    .where(keyValueObj)
    .then((res) => !!res.length);
  return isExist;
};

const pushDataToDatabase = (keyValueObj, table) => {
  db(table)
    .returning("*")
    .insert([keyValueObj])
    .then((res) => console.log(res));
};

module.exports = {
  checkIfExist,
  pushDataToDatabase,
};
