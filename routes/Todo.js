const express = require("express");
const Auth = require("../middlewares/Auth");
const {
  createTodo,
  getTodos,
  editTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

const app = express();

app.post("/createTodo", Auth, createTodo);

app.get("/getTodos", Auth, getTodos);

app.put("/updateTodo/:id", Auth, editTodo);

app.delete("/deleteTodo/:id", Auth, deleteTodo);

module.exports = app;
