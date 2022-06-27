const express = require("express");
const app = express();
const path = require("path");
const { getLogout } = require("../server/controllers/users");

const router = require("./routes/users.js");
const routerHomePage = require("./routes/homepage.js");
const routerRmr = require("../server/routes/rmr.js");

app.use("/", express.static(__dirname + "/../public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/users", router);
app.use("/homepage", routerHomePage);
app.use("/rmr", routerRmr);
app.get("/logout", getLogout);

app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
