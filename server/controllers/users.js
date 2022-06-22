const { read } = require("fs");
const path = require("path");
let connectedUser;
let userId;
const {
  checkIfExist,
  pushDataToDatabase,
  verifyUserPassword,
  getProperty,
} = require("../../database/usersAuth");

const PostRegister = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
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
        password,
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
  try {
    const { username, password } = req.body;
    const isExist = await checkIfExist({ username }, "users");
    if (isExist) {
      const verifyPassword = await verifyUserPassword(req.body);
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
  res.redirect("/users/login");
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
};
