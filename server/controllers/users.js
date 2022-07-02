const { read } = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
let searches = [];
let connectedUsers = [];

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
        userId = await getProperty("user_id", { username }, "users");
        const userObj = {
          username,
          token: Math.random(),
          userId: userId[0].user_id,
        };
        connectedUsers.push(userObj);
        searches[userId[0].user_id] = [];
        res.cookie("data", JSON.stringify(userObj), {
          maxAge: Number(process.env.COOKIES_EXPIRATION_MINS) * 60 * 1000,
        });
        res.status(200).send();
      } else {
        res.status(403).send();
      }
    } else {
      res.status(406).send();
    }
    // res.json({ username, password });
  } catch (err) {
    console.log("ERROR POST LOGIN", err);
  }
};

const getLogin = (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../../public/login/login.html"));
};

const getLogout = (req, res) => {
  connectedUsers.splice(
    connectedUsers.findIndex(
      (userObj) => userObj.userId === req.connectedUserId
    ),
    1
  );
  res.clearCookie("data");
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
  getConnectedUsers() {
    return connectedUsers;
  },
  getLogout,
  getSearches,
};
