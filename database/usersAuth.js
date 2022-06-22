const knex = require("knex");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: "5432",
    user: "postgres",
    password: "Amit9496",
    database: "nutritionApp",
  },
});

const checkIfExist = (keyValueObj, table) => {
  const isExist = db(table)
    .select("*")
    .where(keyValueObj)
    .then((res) => !!res.length);
  return isExist;
};

const pushDataToDatabase = (keyValueObj, table) => {
  console.log(keyValueObj);
  db(table)
    .returning("*")
    .insert([keyValueObj])
    .then((res) => console.log(res));
};

const verifyUserPassword = (keyValueObj) => {
  const { username, password } = keyValueObj;
  console.log(password);
  const verifyPassword = db("users")
    .select("password")
    .where({ username })
    .then((res) => {
      console.log(res);
      return res[0].password === password ? true : false;
    });
  return verifyPassword;
};

const getProperty = (property, where, table) => {
  return db(table).select(property).where(where);
};

const displayAllFood = () => {
  return db("foods").select("*");
};

module.exports = {
  checkIfExist,
  verifyUserPassword,
  pushDataToDatabase,
  getProperty,
  displayAllFood,
};
