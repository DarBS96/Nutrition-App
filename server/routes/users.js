const express = require("express");
const router = express.Router();
const { postLogin, getLogin } = require("../controllers/users");

router.get("/login", getLogin);
router.post("/login", postLogin);

module.exports = router;
