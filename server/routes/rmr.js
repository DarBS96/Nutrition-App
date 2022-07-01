const express = require("express");
const routerRmr = express.Router();
const { getRmr, postRmr } = require("../controllers/rmr.js");
const { verify } = require("./homepage");

routerRmr.get("/", verify, getRmr);

routerRmr.post("/", verify, postRmr);

module.exports = routerRmr;
