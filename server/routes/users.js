const express = require("express");
const router = express.Router();

router.get("/login", login);

module.exports = router;
