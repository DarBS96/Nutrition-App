const express = require("express");
const app = express();
const path = require("path");

const router = require("./routes/users.js");
const routerHomePage = require("./routes/homepage.js");

app.use("/", express.static(__dirname + "/../public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/users", router);
app.use("/homepage", routerHomePage);

app.listen(3000, () => console.log("server running on port 3000"));
