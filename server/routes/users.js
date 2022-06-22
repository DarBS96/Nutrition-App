const express = require("express");
const router = express.Router();

const {
  postLogin,
  getLogin,
  PostRegister,
  GetRegister,
  getLogout,
} = require("../controllers/users");

router.post("/register", PostRegister);
router.get("/register", GetRegister);
router.get("/login", getLogin);
router.post("/login", postLogin);

module.exports = router;
