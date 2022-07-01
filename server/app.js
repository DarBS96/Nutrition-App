const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { getLogout } = require("../server/controllers/users");

const router = require("./routes/users.js");
const { routerHomePage, verify } = require("./routes/homepage.js");
const routerRmr = require("../server/routes/rmr.js");

app.use("/", express.static(__dirname + "/../public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/users", router);
app.use("/homepage", routerHomePage);
app.use("/rmr", routerRmr);
app.get("/logout", verify, getLogout);

app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
