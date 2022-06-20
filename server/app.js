const express = require("express");

const app = express();

const router = require("./routes/users.js");

app.use("/users", router);

app.listen(3000, () => console.log("server running on port 3000"));
