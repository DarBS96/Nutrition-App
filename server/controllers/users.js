const path = require("path");

const login = () => {};

const PostRegister = (req, res) => {
  console.log(req.body);
};
const GetRegister = (req, res) => {
  res.sendFile(
    path.resolve(__dirname + "/../../public/register/register.html")
  );
};

module.exports = {
  PostRegister,
  GetRegister,
};
