const express = require("express");
const { signUp, Login, getUser } = require("../controllers/user.controller");
const Auth = require("../middlewares/Auth");

const app = express();

app.post("/signUp", signUp);

app.post("/login", Login);

app.get("/getUser", Auth, getUser);

module.exports = app;
