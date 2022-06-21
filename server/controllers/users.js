const { read } = require("fs");
const path = require("path");
const {
  checkIfExist,
  verifyUserPassword,
} = require("../../database/usersAuth");

const PostRegister = (req, res) => {
  console.log(req.body);
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
      console.log(verifyPassword);
      verifyPassword ? res.status(200) : res.status(403);
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

module.exports = { postLogin, getLogin, PostRegister, GetRegister };
