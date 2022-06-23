const db = require("./connection");
const checkIfExist = (keyValueObj, table) => {
  try {
    const isExist = db(table)
      .select("*")
      .where(keyValueObj)
      .then((res) => !!res.length);
    return isExist;
  } catch (err) {
    console.log(err);
  }
};

const pushDataToDatabase = (keyValueObj, table) => {
  db(table).returning("*").insert([keyValueObj]);
};

const verifyUserPassword = (keyValueObj) => {
  const { username, password } = keyValueObj;
  const verifyPassword = db("users")
    .select("password")
    .where({ username })
    .then((res) => {
      return res[0].password === password ? true : false;
    });
  return verifyPassword;
};

const getProperty = (property, where, table) => {
  return db(table).select(property).where(where);
};

const deleteFromHistory = (where, table) => {
  return db(table).where(where).del().returning("*");
};

module.exports = {
  checkIfExist,
  verifyUserPassword,
  pushDataToDatabase,
  getProperty,
  deleteFromHistory,
};
