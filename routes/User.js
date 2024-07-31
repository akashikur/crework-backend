const express = require("express");
const { signUp, Login } = require("../controllers/user.controller");

const app = express();

app.post("/sighUp", signUp);

app.post("/login", Login);

module.exports = app;
