const express = require("express");
const router = express.Router();
const { login, PostRegister, GetRegister } = require("../controllers/users");

// router.get("/login", login);
router.post("/register", PostRegister);
router.get("/register", GetRegister);

module.exports = router;
