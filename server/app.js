const express = require("express");
const app = express();
const path = require("path");

const router = require("./routes/users.js");

console.log(__dirname + "/../public");
app.use("/", express.static(__dirname + "/../public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", router);

app.listen(3000, () => console.log("server running on port 3000"));
