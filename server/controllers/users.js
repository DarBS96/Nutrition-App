const path = require("path");

const PostRegister = (req, res) => {
  console.log(req.body);
};
const GetRegister = (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../../public/register/register.html")
  );
};

const postLogin = (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  res.json({ username, password });
};

const getLogin = (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../../public/login/login.html"));
};

module.exports = { postLogin, getLogin, PostRegister,
  GetRegister, };

