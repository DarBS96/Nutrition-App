const express = require("express");
const routerRmr = express.Router();
const { getRmr, postRmr } = require("../controllers/rmr.js");

routerRmr.get("/", getRmr);

routerRmr.post("/", postRmr);

module.exports = routerRmr;
