const { read } = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
let connectedUser;
let userId;
let searches = [];

const {
  checkIfExist,
  pushDataToDatabase,
  verifyUserPassword,
  getProperty,
} = require("../../database/usersAuth");

const PostRegister = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  const usernameExist = await checkIfExist({ ["username"]: username }, "users");
  const emailExist = await checkIfExist({ ["email"]: email }, "users");
  if (usernameExist) {
    res.status(406).json({
      msg: `The username '${username}' is already taken! Please choose a different one! ⛔`,
    });
    return;
  } else if (emailExist) {
    res.status(406).json({
      msg: `The email '${email}' is already taken! Please choose a different one! ⛔`,
    });
    return;
  } else {
    pushDataToDatabase(
      {
        username,
        password: hash,
        email,
        first_name: firstName,
        last_name: lastName,
      },
      "users"
    );
    res.status(200).send({ msg: `You have been registered successfully! 😀` });
    return;
  }
};

const GetRegister = (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../../public/register/register.html")
  );
};

const postLogin = async (req, res) => {
  console.log(connectedUser);
  try {
    const { username, password } = req.body;
    const isExist = await checkIfExist({ username }, "users");
    if (isExist) {
      // const verifyPassword = await verifyUserPassword(req.body);
      const hashPassword = await getProperty(
        "password",
        { username: username },
        "users"
      );
      const verifyPassword = bcrypt.compareSync(
        password,
        hashPassword[0].password
      );
      if (verifyPassword) {
        connectedUser = username;
        userId = await getProperty(
          "user_id",
          { username: connectedUser },
          "users"
        );
        res.status(200);
        connectedUser = username;
      } else {
        res.status(403);
      }
    } else {
      res.status(406);
    }
    res.json({ username, password });
  } catch (err) {
    console.log(err);
  }
};

const getLogin = (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../../public/login/login.html"));
};

const getLogout = (req, res) => {
  connectedUser = undefined;
  searches = [];
  res.redirect("/users/login");
};

let getSearches = () => {
  return searches;
};

module.exports = {
  postLogin,
  getLogin,
  PostRegister,
  GetRegister,
  getConnectedUser() {
    return connectedUser;
  },
  getUserId() {
    return userId?.[0]?.user_id;
  },
  getLogout,
  getSearches,
};
